'use strict';

// Configuring the Articles module
angular.module('applogs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', '使用記錄', 'applogs', 'dropdown', '/applogs(/create)?');
		Menus.addSubMenuItem('topbar', 'applogs', '使用記錄清單', 'applogs');
		//Menus.addSubMenuItem('topbar', 'applogs', 'New Applog', 'applogs/create');
	}
]);
