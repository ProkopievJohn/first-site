function Helper() {
}

/*preloader*/
Helper.prototype.preloaderDown = function () {
	'use strict';
	this.preloaderEl = document.querySelector('#page-preloader');
	this.preloaderTime = parseFloat(getComputedStyle(this.preloaderEl).transitionDuration);
	var self = this;
	setTimeout(function(){self.preloaderEl.style.cssText = 'opacity:0;';}, this.preloaderTime * 100);
	setTimeout(function(){self.preloaderEl.style.cssText = 'display:none;';}, this.preloaderTime * 200);
};
Helper.prototype.preloaderApp = function () {
	'use strict';
	this.preloaderEl = document.querySelector('#page-preloader');
	this.preloaderTime = parseFloat(getComputedStyle(this.preloaderEl).transitionDuration);
	var self = this;
	setTimeout(function(){self.preloaderEl.style.cssText = 'opacity:1;';}, this.preloaderTime * 100);
	setTimeout(function(){self.preloaderEl.style.cssText = 'display:block;';}, this.preloaderTime * 200);
};

/*background move*/
Helper.prototype.backgroundMove = function (el) {
	'use strict';
	if (!el) return;
	this.backgroundMoveEl = el;
	this.backgroundMoveAddEL();
};
Helper.prototype.backgroundMoveAddEL = function () {
	'use strict';
	var self = this;
	window.addEventListener('mousemove', function (event) {
		var e = event || window.event,
				win = {width: window.innerWidth, height: window.innerHeight},
				xVal = (1.2 - 1/(win.height/2)*e.clientY).toFixed(1),
				yVal = (1/(win.width/2)*e.clientX - 1.2).toFixed(1),
				transX = (20/(win.width)*e.clientX - 10).toFixed(1),
				transY = (20/(win.height)*e.clientY - 10).toFixed(1),
				transZ = (100/(win.height)*e.clientY - 50).toFixed(1);
		self.backgroundMoveEl.style.WebkitTransform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
		self.backgroundMoveEl.style.transform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
	})
};

/*xmlhttprequest*/
Helper.prototype.XMLLoad = function(method, url, callback) {
	'use strict';
	var xml = new XMLHttpRequest();
	xml.addEventListener('readystatechange', function () {
		if (xml.readyState === xml.DONE) {
			if (xml.status === 200 && xml.statusText === 'OK') {
				return callback(xml.responseText);
			}
		}
	});
	xml.open(method, url, true);
	xml.send();
};
