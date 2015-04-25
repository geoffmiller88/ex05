'use strict';

//Setting up route
angular.module('music').config(['$stateProvider',
	function($stateProvider) {
		// Music state routing
		$stateProvider.
		state('listMusic', {
			url: '/music',
			templateUrl: 'modules/music/views/list-music.client.view.html'
		}).
		state('createMusic', {
			url: '/music/create',
			templateUrl: 'modules/music/views/create-music.client.view.html'
		}).
		state('viewMusic', {
			url: '/music/:musicId',
			templateUrl: 'modules/music/views/view-music.client.view.html'
		}).
		state('editMusic', {
			url: '/music/:musicId/edit',
			templateUrl: 'modules/music/views/edit-music.client.view.html'
		});
	}
]);