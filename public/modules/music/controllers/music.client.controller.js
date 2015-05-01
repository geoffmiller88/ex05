'use strict';

// Music controller
angular.module('music').controller('MusicController', ['$scope', '$stateParams', '$location', 'Authentication', 'Music', '$http', '$upload', 'Socket', '$sce', 
	function($scope, $stateParams, $location, Authentication, Music, $http, $upload, Socket, $sce) {
		$scope.authentication = Authentication;

		Socket.on('music.created', function(music){
			$scope.musics.push(music);
			console.log(music);
		});

		$scope.config = {
                sources: [
              {src: $sce.trustAsResourceUrl("http://localhost:3000/uploads/01 Right Where I Belong.mp3"), type: "audio/mpeg"},
              {src: $sce.trustAsResourceUrl("http://localhost:3000/uploads/ACDC_-_Back_In_Black-sample.ogg"), type: "audio/ogg"}
          ],
                theme: {
          			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                }
        };

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
		

		$scope.music={
			url:'http://localhost:3000/uploads/01 Right Where I Belong.mp3'	
		};
		


		// Find existing Music
		$scope.findOne = function() {
			$scope.music = Music.get({ 
				musicId: $stateParams.musicId
			});
			var temp='http://localhost:3000'+$scope.music.url;
			$scope.music.url=$sce.trustAsResourceUrl(temp);
			console.log($scope.config);
			//$scope.config.sources[0].src = $sce.trustAsResourceUrl('http://localhost:3000'+$scope.music.url);
			//console.log($scope.config);
			// $scope.config.sources[1].src = $sce.trustAsResourceUrl($scope.music.url);
		};
	}
]);