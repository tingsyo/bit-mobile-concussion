'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', '微日記', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', '微日記清單', 'articles');
		//Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
