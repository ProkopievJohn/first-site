function Slider (el) {
	'use strict';
	if (!el) return;
	this.sliderEl = el;
	this.sliderItems = this.sliderEl.querySelectorAll('.item');
	this.sliderAddStartLeft();
	this.sliderAddEL();
	this.sliderStatusTimeOut = true;
	this.sliderStatusAlfa = 0;
}
// add or change width and translateX
Slider.prototype.sliderAddStartLeft = function () {
	'use strict';
	for (var i = 0; i < this.sliderItems.length; i++) {
		this.sliderItems[i].style.cssText += 'width:' + window.innerWidth + 'px;';
	}
	this.sliderEl.style.cssText += 'width:' + (window.innerWidth * this.sliderItems.length) + 'px;' + 'transform: translateX(' + (-window.innerWidth * this.sliderStatusAlfa) + 'px);';
};
// add EventListeners
Slider.prototype.sliderAddEL = function () {
	'use strict';
	var time = 500;
	if (this.sliderEl.addEventListener) {
		if ('onwheel' in document) {
			this.sliderEl.addEventListener("wheel", this.sliderOnWheel.bind(this, time));
		} else if ('onmousewheel' in document) {
			this.sliderEl.addEventListener("mousewheel", this.sliderOnWheel.bind(this, time));
		} else {
			this.sliderEl.addEventListener("MozMousePixelScroll", this.sliderOnWheel.bind(this, time));
		}
	} else {
		this.sliderEl.attachEvent("onmousewheel", this.sliderOnWheel.bind(this, time));
	}
	document.querySelector('.next').addEventListener('click', this.sliderMoveNP.bind(this, time, 'next'));
	document.querySelector('.prev').addEventListener('click', this.sliderMoveNP.bind(this, time, 'prev'));
	window.addEventListener('resize', this.sliderAddStartLeft.bind(this));
};
Slider.prototype.sliderOnWheel = function(time, e){
	'use strict';
	var delta = e.deltaY || e.detail || e.wheelDelta;
	if (delta > 0) {
		this.sliderMoveNP(time, 'next');
	} else {
		this.sliderMoveNP(time, 'prev');
	}
};
// move sliders
Slider.prototype.sliderMoveNP = function(time, move){
	'use strict';
	if (this.sliderStatusTimeOut === false) return;
	this.sliderStatusTimeOut = false;
	var self = this;
	if (move == 'next') {
		if (!(this.sliderGetComputedTranslateX(this.sliderEl) === (window.innerWidth - this.sliderEl.offsetWidth))) {
			this.sliderEl.style.cssText += 'transform: translateX(' + (this.sliderGetComputedTranslateX(this.sliderEl) - window.innerWidth) + 'px);transition: all ease-in-out ' + time + 'ms;';
			this.sliderStatusAlfa += 1;
		}
	}
	if (move == 'prev') {
		if (!(this.sliderGetComputedTranslateX(this.sliderEl) === 0)) {
			this.sliderEl.style.cssText += 'transform: translateX(' + (this.sliderGetComputedTranslateX(this.sliderEl) + window.innerWidth) + 'px);transition: all ease-in-out ' + time + 'ms;';
			this.sliderStatusAlfa -= 1;
		}
	}
	setTimeout(function() {
		self.sliderStatusTimeOut = true;
	}, time + 200);
};
Slider.prototype.sliderGetComputedTranslateX = function(obj) {
	'use strict';
	var styles = getComputedStyle(obj),
			transform = styles.transform || styles.webkitTransform || styles.mozTransform,
			mat = transform.match(/^matrix3d\((.+)\)$/);
	if(mat) return parseFloat(mat[1].split(', ')[12]);
			mat = transform.match(/^matrix\((.+)\)$/);
	return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
};