var helloApp = angular.module("LLOneSignalApp", ['LLOneSignalModule']);

helloApp.controller("LLOneSignalCtrl",
	function($scope, LLOneSignalService) {

		$scope.$on('tags-received', function(event, args) {
			var tags = args.tags;
			$scope.message = tags;
			$scope.$apply();
			console.log(tags);
		});

		$scope.$on('notification-received', function(event, args) {
			var payload = args.payload;
			$scope.message = payload;
			$scope.$apply();
			console.log(payload);
		});

		$scope.$on('notification-opened', function(event, args) {
			var payload = args.payload;
			$scope.message = payload;
			$scope.$apply();
			console.log(payload);
		});

		LLOneSignalService.initialize("7d02bfcd-e065-42a3-9949-21506a47f788", 'androidAppId', 'web.onesignal.auto.34975c41-96f8-43c9-89c6-048b8e5234aa');
		$scope.message = "Controller initialized";
		LLOneSignalService.getTags();

	}
);
