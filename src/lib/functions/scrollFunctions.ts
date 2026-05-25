export function disableScrollFunction() {
	window.scrollTo(0, 0);
	window.onscroll = function () {
		window.scrollTo(0, 0);
	};
}

export function enableScroll() {
	window.onscroll = function () {};
}
