import { apiUrl } from "@/Context/constant";

export default function index() {
	return <div />;
}

export const getServerSideProps = async () => {
	let id = undefined;
	try {
		const url = `${apiUrl}/api/getcustomer`;
		const data = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const res = await data.json();
		if (res.customer[0]) {
			id = res.customer[0].id;
		}
	} catch (error) {
		console.error("Error fetching customer data:", error);
	}

	return {
		redirect: {
			destination: `/dashboard/customer-cart/${id}`,
			permanent: true,
		},
	};
};
