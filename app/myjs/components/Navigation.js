function Navigation (el) {
	'use strict';
	this.navigationEl = el;
	this.navigationAddEL();
	this.statusXML = true;
}

Navigation.prototype = Object.create(Helper.prototype);
Navigation.prototype.navigationAddEL = function () {
	'use strict';
	this.navigationEl.addEventListener('click', this.navigationAddActive.bind(this));
};

/*add active class for nav and send target for make active the section or send xml response, and change background img*/
Navigation.prototype.navigationAddActive = function (e) {
	'use strict';
	var target = e && e.target || window.event.srcElement;
	if (target.tagName == 'A' && !target.classList.contains('active')) {
		for (var i = 0; i < this.navigationEl.querySelectorAll('a').length; i++) {
			this.navigationEl.querySelectorAll('a')[i].classList.remove('active');
		}
		target.classList.add('active');
		var name = target.getAttribute('href').substring(1, target.getAttribute('href').length);
		this.navigationActiveBlock(name);
		this.navigationActiveBackgroundImg(name);
	}
};
// make active section with appropriate class
Navigation.prototype.navigationActiveBlock = function (name) {
	'use strict';
	this.preloaderApp();
	var sections = document.querySelectorAll('section');
	for (var i = 0; i < sections.length; i++) {
		if (name === sections[i].className) {
			this.statusXML = false;
			sections[i].style.cssText = 'display:block;';
			this.preloaderDown();
		} else {
			sections[i].style.cssText = 'display:none;';
		}
	}
	console.log(name);
	if (this.statusXML === true) {
		this.XMLLoad('GET', name + '.html', this.navigationInsertResponse.bind(this));
		console.log(name);
	}
	this.statusXML = true;
};
// working with response from xml
Navigation.prototype.navigationInsertResponse = function(response) {
	'use strict';
	var sections = document.querySelectorAll('section');
	sections[sections.length - 1].insertAdjacentHTML('afterend', response);
	this.preloaderDown();
	this.newSliderCreate();
};
// change background image
Navigation.prototype.navigationActiveBackgroundImg = function(name) {
	'use strict';
	var backgroundImg = document.querySelector('.img');
	var name = name === 'about' ? 'background-image: none;' : 'background-image: url(img/bgimg' + name + '.jpg)';
	backgroundImg.style.cssText = name;
};
Navigation.prototype.newSliderCreate = function() {
	'use strict';
	var sections = document.querySelectorAll('section');
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].classList.contains('news')) {
			new Slider(document.querySelector('.news-items'));
		}
	}
};