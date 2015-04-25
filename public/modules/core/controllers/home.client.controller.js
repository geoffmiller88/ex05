'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.musicLatest = [];

		$scope.init = function(){
		  $http.get('/music/top10').success(function(response){
		    $scope.musicLatest = response;
		  }).error(function(error){
		    console.log(error);
		  });
		};
	}
]);