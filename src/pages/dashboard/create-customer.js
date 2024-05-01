import { addNewCustomer, getCustomerbyId } from "@/Context/utility";
import CustomerActivity from "@/components/Dashboard/CreateCustomer/CustomerActivity";
import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SelectDropDown from "@/components/SelectDropDown";
import TextInput from "@/components/TextInput";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Button, InputLabel, TextareaAutosize } from "@mui/material";
import { City, State } from "country-state-city";
import { useRef } from "react";

export default function CreateCustomer() {
	const [customer, setCustomer] = useState({});
	const [error, setError] = useState({});
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const copyIdRef = useRef(null);
	const [userData, setUserData] = useState({});
	const pages = [
		"Home",
		"Flooring",
		"Tiles",
		"CounterTop",
		"Vanities",
		"Kitchen Faucets",
		"Bathroom Faucets",
		"Cabinets",
	];
	useEffect(() => {
		const userData =
			typeof window !== "undefined"
				? JSON.parse(window.sessionStorage.getItem("user"))
				: null;
		setUserData(userData);
		if (id && userData) {
			getcustomer(id);
		}
	}, [id]);

	const getcustomer = async (custId) => {
		const response = await getCustomerbyId(custId);
		if (response.length) {
			setCustomer(response[0]);
		}
	};
	const stateName = State.getStatesOfCountry("US").map((name) => name.name);
	const selectedStateCode = State.getStatesOfCountry("US").find(
		(state) => state.name === customer?.state,
	);
	const cityName = City.getCitiesOfState("US", selectedStateCode?.isoCode).map(
		(name) => name.name,
	);
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log("[name]: value", { [name]: value });
		setCustomer({ ...customer, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("customer", customer);
		// return false;
		customer.contractorId = userData.id;
		const response = await addNewCustomer(customer);
		if (response) {
			if (id) {
				alert(response.message);
			} else {
				alert(response.message);
			}
		}
	};
	return (
		<Box maxWidth="lg" marginX="auto" px={1} mb={8} mt={4}>
			<Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
				<Stack
					sx={{
						flexBasis: { xs: "100%", lg: "60%" },
						bgcolor: "white",
						padding: { md: "40px 35px", xs: "30px 20px" },
					}}
				>
					<Typography variant="h3" fontSize={25} mb={3}>
						Create customers{" "}
						<Box component="span" fontSize={20} color="gray">
							(customer ID : {customer.id})
						</Box>
					</Typography>
					<Stack
						sx={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
							gap: 2,
							paddingBottom: 4,
						}}
						component="form"
						onSubmit={(e) => handleSubmit(e)}
					>
						<TextInput
							label="First Name"
							name="first_name"
							value={customer?.first_name}
							error={error.first_name}
							onChange={(e) => handleChange(e)}
						/>
						<TextInput
							label="Last name"
							name="last_name"
							value={customer?.last_name}
							error={error.lname}
							onChange={(e) => handleChange(e)}
						/>
						<TextInput
							label="Email"
							name="email"
							value={customer?.email}
							error={error.email}
							onChange={(e) => handleChange(e)}
						/>
						<TextInput
							label="Phone"
							name="phone"
							value={customer?.phone}
							error={error.phone}
							onChange={(e) => handleChange(e)}
						/>
						<SelectDropDown
							error={error.state}
							onChange={(e) => handleChange(e)}
							name="state"
							value={customer?.state}
							initialVal="Province/State"
							menuItems={stateName}
							label="Province/State"
						/>
						<SelectDropDown
							error={error.city}
							onChange={(e) => handleChange(e)}
							name="city"
							value={customer?.city}
							initialVal="Select city"
							menuItems={cityName}
							label="City"
						/>
						<Stack sx={{ gridColumn: "1/-1" }}>
							<TextInput
								label="Address"
								name="address"
								value={customer?.address}
								error={error.address}
								onChange={(e) => handleChange(e)}
							/>
						</Stack>
						<Stack sx={{ gridColumn: "1/-1" }}>
							<InputLabel>Notes</InputLabel>
							<TextareaAutosize
								minRows={3}
								style={{ fontSize: 16, padding: "2px 8px", color: "inherit" }}
								name="note"
								value={customer?.note}
								onChange={(e) => handleChange(e)}
							/>
							{error.note && (
								<Typography component="span" fontSize={13} color="red">
									{error.note}
								</Typography>
							)}
						</Stack>
						<SelectDropDown
							error={error.catagory}
							onChange={(e) => handleChange(e)}
							name="category"
							value={customer?.catagory}
							initialVal="Other"
							menuItems={["Other", "Demolition"]}
							label="Interested Category"
						/>
						<TextInput
							label="Other"
							name="other"
							value={customer?.other}
							error={error.other}
							onChange={(e) => handleChange(e)}
						/>
						<Stack>
							<InputLabel sx={{ fontWeight: 600 }}>Custom URL</InputLabel>
							<Stack
								component="button"
								type="button"
								direction="row"
								ref={copyIdRef}
								alignItems="center"
								spacing={1}
							>
								<Typography>sub.domain.com/{customer.id}</Typography>
								<CopyAllIcon sx={{ cursor: "pointer" }} />
							</Stack>
						</Stack>
						<SelectDropDown
							error={error.page}
							onChange={(e) => handleChange(e)}
							name="page"
							value={customer?.page}
							menuItems={pages}
							label="URL should go to"
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{
								width: "fit-content",
								gridColumn: 2 / -1,
								justifySelf: "end",
							}}
						>
							Create
						</Button>
					</Stack>
					{/* <Form customer={customer} /> */}
				</Stack>
				<CustomerActivity />
			</Box>
		</Box>
	);
}
