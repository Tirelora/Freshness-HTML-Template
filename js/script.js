$(document).ready(function(){

	var menuOptions = {
		menu: $('nav'),
		items: {
			home: '#',
			'style demo': {
				'full width': '#',
				'medium width': '#',
				'small width': '#'
			},
			dropdown: {
				dropmenu: '#',
				downmenu: '#',
			},
			portfolio: {
				'years 2010-2012': '#',
				'year 2013': '#',
				'year 2014': '#',
				'year 2015': '#',
				'year 2016': '#'
			},
			gallery: {
				webdesign: '#',
				logos: '#',
				art: '#',
				'3D': '#'
			},
			about: '#'
		},
		button: $('#hamburger')
	};

	createBigMenu(menuOptions);

	createSmallMenu(menuOptions);

	createSlider({
		slides: $('.slide'),
		toggle: $('.toggle')
	});

});

function createBigMenu(options) {
	var menu = options.menu;
	var items = options.items;

	$(menu).mousedown(function(event){
		event.preventDefault();
	});

	$(menu).click(function(event){
		toggleSubmenu(event);
	});

	var submenu;

	function renderSubmenu(items) {
		var items = items || {};
		submenu = document.createElement('ul');
		$(submenu).addClass('submenu');

		for (var key in items){
			$(submenu).append("<li><a href='" + items[key] + "'>" + key + "</a></li>");
		};

		$(submenu).mousedown(function(event){
			event.preventDefault();
		});

		return submenu;
	};

	function toggleSubmenu(event) {
		var menuItem = event.target;
		if (! $(menuItem).attr('data-subitems')) return;

		if (submenu) {
			hideSubmenu();
		} else {
			var item = $(menuItem).attr('data-subitems');
			var subItems = items[item];
			submenu = renderSubmenu(subItems);
			$(menuItem).append(submenu);
		};

		$(menuItem).mouseleave(function(){
			hideSubmenu();
		});
	};

	function hideSubmenu() {
		$(submenu).remove();
		submenu = null;
	}

};

function createSmallMenu(options) {
	var menu = options.menu;
	var items = options.items;
	var button = options.button;

	var menuItems;
	var submenu;

	$(button).click(function() {
		if (menuItems) hideMenu();
		else renderMenu();
	});

	$(window).resize(function(){
		hideMenu();
	});

	function renderMenu() {
		menuItems = document.createElement('ul');
		$(menuItems).addClass('small-menu');

		for (var key in items) {
			if (typeof items[key] == 'string') {
				$(menuItems).append('<li><a href="' + items[key] + '">' + key + '</a></li>');
			} else {
				$(menuItems).append('<li data-subitems-accord="' + key + '">' + key + '</li>');
			}
		};

		$(menu).append(menuItems);

		$(menuItems).click(function(event){
			var item = event.target;

			if ( ($(menuItems).children().hasClass('small-submenu')) &&
				($('.small-submenu').css('display', function(index, oldval) {
					if (oldval == 'block') return true;
				})) ) {
				$('.small-submenu').slideUp(1000);
			}

			if (!( $(item).next().hasClass('small-submenu') )) {
				showSubmenu(event);
			};

			if ( ($(item).next().hasClass('small-submenu')) &&
				($(item).next().css('display') == 'none') ) {
				$(item).next().slideDown(1000);
			}
		});

		return menuItems;
	};

	function hideMenu() {
		$(menuItems).remove();
		menuItems = null;
	};

	function showSubmenu(event) {
		var menuItem = event.target;
		if (! $(menuItem).attr('data-subitems-accord') ) return;

		var submenu = document.createElement('ul');
		$(submenu).addClass('small-submenu');

		var item = $(menuItem).attr('data-subitems-accord');
		var subItems = items[item];

		for (var key in subItems){
			$(submenu).append("<li><a href='" + subItems[key] + "'>" + key + "</a></li>");
		};

		$(menuItem).after(submenu);
		$(submenu).slideDown(1000);

		return submenu;
	};

};

function createSlider(options) {
	var slides = options.slides;
	var toggle = options.toggle;
	var currentSlide = 0;

	var timer = setInterval(function(){
		displaySlide(currentSlide);
	}, 10000);

	$(toggle).click(function(event){
		displaySlide(event);
		clearInterval(timer);

		timer = setInterval(function(){
			displaySlide(currentSlide);
		}, 10000);
	});

	$(toggle).mousedown(function(event){
		event.preventDefault();
	});

	function displaySlide(event) {
		$(slides[currentSlide]).fadeOut(500);

		setTimeout(function() {
			$(toggle[currentSlide]).removeClass('active');

			if (event.target) {
				currentSlide = $(event.target).index();
			} else {
				currentSlide++;
				if (currentSlide == slides.length) {
					currentSlide = 0;
				}
			}

			$(slides[currentSlide]).fadeIn(500);
			$(toggle[currentSlide]).addClass('active');
		}, 500);
	}
};