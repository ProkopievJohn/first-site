function NewsSlider(el) {
	'use strict';
	this.el = document.querySelector(el);
	this.items = this.el.querySelectorAll('.item');
	this.addStartLeft();
	this.addEL();
	this.status = true;
}
NewsSlider.prototype.addStartLeft = function(){
	'use strict';
	for (var i = 0; i < this.items.length; i++) {
		this.items[i].style.left = i * window.innerWidth + 'px';
	}
};
NewsSlider.prototype.addResizeLeft = function () {
	'use strict';
	var k = 0;
	for (var j = 0; j < this.items.length; j++) {
		if (this.items[j].offsetLeft === 0) {
			k = j;
		}
	}
	for (var i = 0; i < this.items.length; i++) {
		if (this.items[i].offsetLeft < 0) {
			this.items[i].style.left = (i - k) * this.el.clientWidth + 'px';
		}
		if (this.items[i].offsetLeft > 0) {
			this.items[i].style.left = (i - k) * this.el.clientWidth + 'px';
		}
	}
};
NewsSlider.prototype.addEL = function () {
	'use strict';
	var time = 500;
	if (this.el.addEventListener) {
		if ('onwheel' in document) {
			this.el.addEventListener("wheel", this.onWheel.bind(this, time));
		} else if ('onmousewheel' in document) {
			this.el.addEventListener("mousewheel", this.onWheel.bind(this, time));
		} else {
			this.el.addEventListener("MozMousePixelScroll", this.onWheel.bind(this, time));
		}
	} else {
		this.el.attachEvent("onmousewheel", this.onWheel.bind(this, time));
	}
	this.el.querySelector('.next').addEventListener('click', this.moveNP.bind(this, time, 'next'));
	this.el.querySelector('.prev').addEventListener('click', this.moveNP.bind(this, time, 'prev'));
	window.addEventListener('resize', this.addResizeLeft.bind(this));
};
NewsSlider.prototype.onWheel = function(time, e){
	'use strict';
	var delta = e.deltaY || e.detail || e.wheelDelta;
	if (delta > 0) {
		this.moveNP(time, 'next');
	} else {
		this.moveNP(time, 'prev');
	}
};
NewsSlider.prototype.moveNP = function(time, move){
	'use strict';
	if (this.status === false) return;
	this.status = false;
	var self = this;
	if (move == 'next') {
		if (this.items[0].parentNode.lastElementChild.offsetLeft > 0) {
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].style.cssText = 'left:' + (this.items[i].offsetLeft - this.el.clientWidth) + 'px;transition: all ease-in-out ' + time + 'ms;';
			}
		}
	}
	if (move == 'prev') {
		if (this.items[0].offsetLeft < 0) {
			for (var j = 0; j < this.items.length; j++) {
				this.items[j].style.cssText = 'left:' + (this.items[j].offsetLeft + this.el.clientWidth) + 'px;transition: all ease-in-out ' + time + 'ms;';
			}
		}
	}
	setTimeout(function() {
		self.status = true;
	}, time + 100);
};