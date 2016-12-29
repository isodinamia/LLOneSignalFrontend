var LLOneSignal = {


	initialize: function(notificationOpenedCallback) {
		window.plugins.OneSignal
			.startInit("7d02bfcd-e065-42a3-9949-21506a47f788")
    		.handleNotificationOpened(notificationOpenedCallback)
    		.endInit();
	},

	sendTags: function(tags){
		console.log('LLOneSignal sendTags');
		window.plugins.OneSignal.sendTags(tags);
	},

	deleteTags: function(tags){
		console.log('LLOneSignal deleteTags');
		window.plugins.OneSignal.deleteTags(tags);
	},

	getTags: function(callback) {
		console.log('LLOneSignal getTags');
		window.plugins.OneSignal.getTags(callback);
	}

};
