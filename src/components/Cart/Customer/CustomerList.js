import { useCustomers } from "@/Context/CustomersProvider/CustomersProvider";
import { getCustomer } from "@/Context/CustomersProvider/action";
import { GET_CUSTOMER } from "@/Context/CustomersProvider/actionType";
import { apiUrl } from "@/Context/constant";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CustomerItem from "./CustomerItem";

export default function CustomerList() {
	const { customers, dispatch } = useCustomers() || [];
	const [newCustomer, setNewCustomer] = useState("");

	const getCustomer = async () => {
		try {
			const url = `${apiUrl}/api/getcustomer`;
			const data = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const res = await data.json();
			setNewCustomer(res.customer);

			dispatch({ type: GET_CUSTOMER, payload: res.customer });
		} catch (error) {
			console.error("Error fetching customer data:", error);
		}
	};

	useEffect(() => {
		getCustomer();
	}, []);

	return (
		<Stack
			spacing={1}
			direction={{ md: "column", xs: "row" }}
			width={{ md: "300px", xs: "700px" }}
			sx={{ overflow: "auto" }}
		>
			{customers.map((customer) => (
				<CustomerItem customer={customer} key={customer.id} />
			))}
		</Stack>
	);
}
