var LLOneSignalService = angular.module('LLOneSignalModule', [])
.service('LLOneSignalService', function() {

	this.initialize = function(notificationReceivedCallback, notificationOpenedCallback) {

		this.isCordovaApp = !!window.cordova;

		if(this.isCordovaApp){

			window.plugins.OneSignal
				.startInit("7d02bfcd-e065-42a3-9949-21506a47f788")
    			.handleNotificationOpened(notificationOpenedCallback)
    			.handleNotificationReceived(notificationReceivedCallback)
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

	this.getTags = function(getTagsCallback) {
		if(this.isCordovaApp) {
			window.plugins.OneSignal.getTags(getTagsCallback);
		} else {
			OneSignal.getTags().then(getTagsCallback);
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
	
});