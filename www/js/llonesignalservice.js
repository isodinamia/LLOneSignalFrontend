var LLOneSignalService = angular.module('LLOneSignalModule', [])
.service('LLOneSignalService', ['$rootScope' , function($rootScope) {

	this.initialize = function( appId ) {

		this.isCordovaApp = !!window.cordova;

		if(this.isCordovaApp){

			window.plugins.OneSignal
				.startInit(appId)
    			.handleNotificationOpened(this.notificationOpenedCallback)
    			.handleNotificationReceived(this.notificationReceivedCallback)
    			.endInit();

    	} else {

    		var OneSignal = window.OneSignal || [];
	
			OneSignal.push([ "init", {
				appId : appId,
				autoRegister : false,
				notifyButton : {
					enable : true
				}
			} ]);
			
			OneSignal.push(["addListenerForNotificationOpened", this.notificationOpenedCallback]);
			OneSignal.on('notificationDisplay', this.notificationReceivedCallback);

    	}
	};

	this.getTags = function() {
		if(this.isCordovaApp) {
			window.plugins.OneSignal.getTags(this.getTagsCallback);
		} else {
			OneSignal.getTags().then(this.getTagsCallback);
		}
	}

	this.sendTags = function(tags) {
		if(this.isCordovaApp) {
			window.plugins.OneSignal.sendTags(tags);
		} else {
			OneSignal.sendTags(tags);	
		}
	}
	
	this.deleteTags = function(tags) {
		if(this.isCordovaApp) {
			window.plugins.OneSignal.deleteTags(tags);
		} else {
			OneSignal.deleteTags(tags);	
		}
	}

	this.getTagsCallback = function(tags) {
		$rootScope.$broadcast('tags-received', { tags });
	}

	this.notificationReceivedCallback = function(payload) {
		$rootScope.$broadcast('notification-received', { payload });
	}

	this.notificationOpenedCallback = function(payload) {
		$rootScope.$broadcast('notification-opened', { payload });
	}
	
}]);