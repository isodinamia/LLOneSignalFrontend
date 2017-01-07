var LLOneSignalService = angular.module('LLOneSignalModule', [])
.service('LLOneSignalService', ['$rootScope' , function($rootScope) {

	this.initialize = function( appId , androidAppId, safariWebId , oneSignalSubDomainName , pushDefaultUrl ) {

		this.isCordovaApp = !!window.cordova;

		if(this.isCordovaApp){

			window.plugins.OneSignal
				.startInit(appId, androidAppId )
    			.handleNotificationOpened(this.notificationOpenedCallback)
    			.handleNotificationReceived(this.notificationReceivedCallback)
					.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
					.endInit();

    	} else {

    		var OneSignal = window.OneSignal || [];

				var initData = {
				appId : appId,
				autoRegister : false,
				notificationClickHandlerMatch: 'origin',
				httpPermissionRequest: {
					enable: true
				},
				persistNotification: false,
				// notifyButton : {
				// 	enable : true
				// },
				promptOptions: {
					/* Change bold title,  limited to 30 characters */
					siteName: 'Sabios',
					/* Subtitle, limited to 90 characters */
					actionMessage: "Nos gustaria mostrarte las alertas que se generan en Sabios",
					/* Example notification title */
					exampleNotificationTitle: 'Ejemplo',
					/* Example notification message */
					exampleNotificationMessage: 'Esto es una alerta de ejemplo',
					/* Text below example notification, limited to 50 characters */
					exampleNotificationCaption: 'Recibe eventos, noticas, etc.',
					/* Accept button text, limited to 15 characters */
					acceptButtonText: "Permitir",
					/* Cancel button text, limited to 15 characters */
					cancelButtonText: "No, gracias"
				},

				welcomeNotification: {
					title: "Bienvenido a Sabios",
					message: "Gracias por subscribirte al servicio de notificaciones web de nuestra plataforma"
				},

				safari_web_id: safariWebId,
			}

			if ( oneSignalSubdomainName ) {
      	initData.subdomainName = oneSignalSubdomainName;
			}

			OneSignal.push([ "init", initData  ]);
			
			//Default navigation url for notifications, only works on Chrome and Firefox
			OneSignal.push(function () {
				OneSignal.setDefaultNotificationUrl(appSettings.pushDefaultUrl);
			});


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
