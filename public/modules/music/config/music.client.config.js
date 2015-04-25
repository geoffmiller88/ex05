'use strict';

// Configuring the Articles module
angular.module('music').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Music', 'music', '', '/music(/create)?');
		//Menus.addSubMenuItem('topbar', 'music', 'List Music', 'music');
		Menus.addMenuItem('topbar', 'Upload Music', 'music/create', '','music/create');
	}
]);