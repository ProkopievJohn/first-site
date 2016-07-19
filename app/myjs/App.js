function App() {
	'use strict';
	this.init();
}
App.prototype = Object.create(Helper.prototype);
App.prototype.init = function(){
	'use strict';
	this.preloaderDown();
	this.backgroundMove(document.querySelector('.img-move'));
	new Navigation(document.querySelector('nav'));
};
window.addEventListener('DOMContentLoaded', function(){
	'use strict';
	new App();
});