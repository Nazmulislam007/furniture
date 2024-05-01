import Toastify from "toastify-js";

export default function useToast() {
	const toast = (msg, color) => {
		Toastify({
			text: msg,
			duration: 3000,
			style: {
				background: color,
			},
			onClick() {}, // Callback after click
		}).showToast();
	};

	return toast;
}
