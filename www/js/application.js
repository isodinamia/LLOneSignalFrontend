var helloApp = angular.module("LLOneSignalApp", ['LLOneSignalModule']);

helloApp.controller("LLOneSignalCtrl",
	function($scope, $window, LLOneSignalService) {

		$scope.message = "Controller initialize";

		var callback = function(payload){ 
			console.log(payload);
		}

		LLOneSignalService.initialize(callback, callback);

		LLOneSignalService.getTags(function(tags){
			console.log(tags);
		});
	}
);