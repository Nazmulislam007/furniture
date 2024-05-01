export default function useDebouce() {
	const debounce = (fn) => {
		let timeout;
		return (...arg) => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				fn(...arg);
			}, 500);
		};
	};
	return debounce;
}
