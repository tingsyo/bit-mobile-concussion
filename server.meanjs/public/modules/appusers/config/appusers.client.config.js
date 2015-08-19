'use strict';

// Configuring the Articles module
angular.module('appusers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', '使用者', 'appusers', 'dropdown', '/appusers(/create)?');
		Menus.addSubMenuItem('topbar', 'appusers', '使用者清單', 'appusers');
		Menus.addSubMenuItem('topbar', 'appusers', '新增使用者', 'appusers/create');
	}
]);
