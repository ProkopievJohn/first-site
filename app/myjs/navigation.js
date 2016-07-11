function Nav (el) {
	"use strict";
	this.el = document.querySelector(el);
	this.els = {
		preloader: document.querySelector('#page-preloader'),
		home: document.querySelector('.home'),
		news: document.querySelector('.news'),
		about: document.querySelector('.about'),
		contact: document.querySelector('.contact')
	};
	this.addEL();
}
Nav.prototype.addEL = function () {
	"use strict";
	this.el.addEventListener('click', this.addActive.bind(this));
};
Nav.prototype.addActive = function (e) {
	"use strict";
	var target = e && e.target || window.event.srcElement;
	if (target.tagName == 'A' && !target.classList.contains('active')) {
		for (var i = 0; i < this.el.querySelectorAll('a').length; i++) {
			this.el.querySelectorAll('a')[i].classList.remove('active');
		}
		target.classList.add('active');
		this.activeBlock(target);
	}
};
Nav.prototype.activeBlock = function (target) {
	'use strict';
	for (var key in this.els) {
		if (key == target.getAttribute('href').substring(1, target.getAttribute('href').length)) {
			this.els[key].style.cssText = 'display:block;';
		} else {
			this.els[key].style.cssText = 'display:none;';
		}
	}
};