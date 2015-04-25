'use strict';

// Music controller
angular.module('music').controller('MusicController', ['$scope', '$stateParams', '$location', 'Authentication', 'Music', '$http', '$upload', 'Socket',
	function($scope, $stateParams, $location, Authentication, Music, $http, $upload, Socket) {
		$scope.authentication = Authentication;

		Socket.on('music.created', function(music){
			$scope.musics.push(music);
			console.log(music);
		});


		$scope.file = '';

		// Create new Music
		$scope.create = function() {

			if ($scope.files && $scope.files.length) {
            for (var i = 0; i < $scope.files.length; i++) {
                var file = $scope.files[i];
                $upload.upload({
                    url: 'music/',
                    fields: {'name': $scope.name},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                	$location.path('music/' + data._id);
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }

			
		};

		$scope.addcomment = function(){
		  var musicId = $stateParams.musicId;
		  var comment = {
		    comment : $scope.comment
		  };
		  $http.post('/music/'+musicId+'/comment',comment).success(function(response){
		    $scope.music = response;
		    $scope.comment = '';
		  }).error(function(error){
		    console.log(error);
		  });
		};

		// Remove existing Music
		$scope.remove = function(music) {
			if ( music ) { 
				music.$remove();

				for (var i in $scope.music) {
					if ($scope.music [i] === music) {
						$scope.music.splice(i, 1);
					}
				}
			} else {
				$scope.music.$remove(function() {
					$location.path('music');
				});
			}
		};

		// Update existing Music
		$scope.update = function() {
			var music = $scope.music;

			music.$update(function() {
				$location.path('music/' + music._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Music
		$scope.find = function() {
			$scope.musics = Music.query();
		};

		// Find existing Music
		$scope.findOne = function() {
			$scope.music = Music.get({ 
				musicId: $stateParams.musicId
			});
		};
	}
]);