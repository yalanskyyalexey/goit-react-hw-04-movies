export default function smoothScroll() {
	return window.scrollTo({
		top: document.documentElement.scrollHeight,
		behavior: 'smooth',
	});
}
