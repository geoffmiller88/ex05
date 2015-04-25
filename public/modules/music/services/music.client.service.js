'use strict';

//Music service used to communicate Music REST endpoints
angular.module('music').factory('Music', ['$resource',
	function($resource) {
		return $resource('music/:musicId', { musicId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);