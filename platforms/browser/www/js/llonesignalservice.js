var LLOneSignalService = angular.module('LLOneSignalModule', [])
.service('LLOneSignalService', function($rootScope) {

	this.initialize = function() {

		this.isCordovaApp = !!window.cordova;

		if(this.isCordovaApp){

			window.plugins.OneSignal
				.startInit("7d02bfcd-e065-42a3-9949-21506a47f788")
    			.handleNotificationOpened(this.notificationOpenedCallback)
    			.handleNotificationReceived(this.notificationReceivedCallback)
    			.endInit();

    	} else {

    		var OneSignal = $window.OneSignal || [];
	
			OneSignal.push([ "init", {
				appId : "7d02bfcd-e065-42a3-9949-21506a47f788",
				autoRegister : false,
				notifyButton : {
					enable : true
				}
			} ]);

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
	
});