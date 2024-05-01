import { useCustomers } from "@/Context/CustomersProvider/CustomersProvider";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomerInfo from "./CustomerInfo";

export default function CustomerDetails() {
	const { selectedCustomer, customers } = useCustomers() || {};

	const { id, fname, lname, phone, city, state, email, address } =
		customers.find((cus) => cus.id === selectedCustomer);
	const data = customers.find((cus) => cus.id === selectedCustomer);

	return (
		<Box padding="30px 30px" bgcolor="white">
			<Typography component="div" fontSize={22} fontWeight={500}>
				Customer Details
			</Typography>
			<Stack direction="row" mt={1} gap="20px" flexWrap="wrap">
				<CustomerInfo title="Cart ID" value={id} />
				<CustomerInfo title="Customer ID" value={id} />
			</Stack>
			<Stack direction="row" mt={1} gap="20px" flexWrap="wrap">
				<CustomerInfo
					title="First Name"
					value={fname ? fname : data?.first_name}
				/>
				<CustomerInfo
					title="Last Name"
					value={lname ? lname : data?.last_name}
				/>
				<CustomerInfo title="Phone" value={phone} />
				<CustomerInfo title="Email" value={email} />
			</Stack>
			<Stack direction="row" mt={1} gap="20px" flexWrap="wrap">
				<CustomerInfo title="City" value={city} />
				<CustomerInfo title="Province/State" value={state} />
				<CustomerInfo title="Address" value={address} />
			</Stack>
			<Typography component="p" my={2}>
				Created 24th July 2022
			</Typography>
			<Button variant="text">Remove this cart</Button>
		</Box>
	);
}
