window.addEventListener('load', function(){
	'use strict';

(function	(time) {
	var els = {
		preloader: document.querySelector('#page-preloader'),
		home: document.querySelector('.home'),
		news: document.querySelector('.news'),
		about: document.querySelector('.about'),
		contact: document.querySelector('.contact')
	};
	setTimeout(function(){els.preloader.style.cssText = 'opacity:0;transition: opacity ' + time + 'ms;';}, time);
	setTimeout(function(){
		els.preloader.style.display = 'none';
		for (var key in els) {
			if (key == 'home') {
				els[key].style.cssText = 'display:block;';
			} else {
				els[key].style.cssText = 'display:none;';
			}
		}
	}, time * 2);
	})(500)

	new Nav('nav');
	new BackgroundMove('.background-home');
	new BackgroundMove('.background-news');
	new BackgroundMove('.background-contact');
	new NewsSlider('.news');
})