import { useCustomers } from "@/Context/CustomersProvider/CustomersProvider";
import { apiUrl } from "@/Context/constant";
import SelectDropDown from "@/components/SelectDropDown";
import TextInput from "@/components/TextInput";
import useToast from "@/lib/hook/useToast";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import {
	Button,
	InputLabel,
	Stack,
	TextareaAutosize,
	Typography,
} from "@mui/material";
import { City, State } from "country-state-city";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import * as Yup from "yup";

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

export default function Form({ customer }) {
	const currentUser =
		typeof window !== "undefined"
			? JSON.parse(window.sessionStorage.getItem("user"))
			: null;
	const toast = useToast();
	const { dispatch, customers } = useCustomers();
	const [singleCustomer, setSingleCustomer] = useState(customer);
	const copyIdRef = useRef(null);
	const router = useRouter();

	console.log("customer", customer);
	const formik = useFormik({
		initialValues: {
			fname: singleCustomer?.first_name,
			lname: singleCustomer?.last_name,
			email: singleCustomer?.email,
			phone: singleCustomer?.phone,
			address: "",
			state: "Province/State",
			city: "Select city",
			note: "",
			catagory: "Other",
			page: "Home",
			other: "",
		},
		validationSchema: Yup.object({
			fname: Yup.string().required("Field Required"),
			lname: Yup.string().required("Field Required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Field Required"),
			phone: Yup.number()
				.test(
					"len",
					"Must be exactly 5 characters",
					(val) => val.toString().length === 5,
				)
				.required("Field Required"),
			address: Yup.string().required("Field Required"),
			state: Yup.string().required("Field Required"),
			city: Yup.string().required("Field Required"),
			note: Yup.string().required("Field Required"),
			catagory: Yup.string().required("Field Required"),
			page: Yup.string().required("Field Required"),
			other: Yup.string().required("Field Required"),
		}),
		onSubmit: async (values) => {
			if (!currentUser) {
				return alert("Please login to add new customer.");
			}

			const contractorId = currentUser?.id;
			const formValues = { ...values, contractorId };
			console.log("current user", currentUser.id);
			if (customers?.find((customer) => customer.id === id))
				return toast("Already user exist", "red").showToast();
			/* dispatch(
            createCustomer({
               ...values,
               createdAt: moment().format('DD MMM YYYY'),
               id,
               status: false,
               goto: true,
            })
         ); */
			const apiUrlEndpoint = `${apiUrl}/api/addcustomer`;
			const response = await fetch(apiUrlEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formValues),
			});
			if (!response.ok) {
				return console.log("res", res);
			}

			console.log("response", response);
			const res = await response.json();

			console.log("user created");
			toast("User was created", "green").showToast();
			router.push("/dashboard");
		},
	});

	const stateName = State.getStatesOfCountry("US").map((name) => name.name);
	const selectedStateCode = State.getStatesOfCountry("US").find(
		(state) => state.name === formik.values.state,
	);
	const cityName = City.getCitiesOfState("US", selectedStateCode?.isoCode).map(
		(name) => name.name,
	);

	const error = formik.touched && formik.errors ? formik.errors : null;

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setSingleCustomer({ ...singleCustomer, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("singleCustomer", singleCustomer);
	};
	return (
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
				value={singleCustomer?.first_name}
				onBlur={formik.handleBlur}
				error={error.first_name}
				onChange={(e) => handleChange(e)}
			/>
			<TextInput
				label="Last name"
				name="last_name"
				value={singleCustomer?.last_name}
				onBlur={formik.handleBlur}
				error={error.lname}
				onChange={(e) => handleChange(e)}
			/>
			<TextInput
				label="Email"
				name="email"
				value={singleCustomer?.email}
				onBlur={formik.handleBlur}
				error={error.email}
				onChange={(e) => handleChange(e)}
			/>
			<TextInput
				label="Phone"
				name="phone"
				value={singleCustomer?.phone}
				onBlur={formik.handleBlur}
				error={error.phone}
				onChange={(e) => handleChange(e)}
			/>
			<SelectDropDown
				onBlur={formik.handleBlur}
				error={error.state}
				onChange={(e) => handleChange(e)}
				name="state"
				value={singleCustomer?.state}
				initialVal="Province/State"
				menuItems={stateName}
				label="Province/State"
			/>
			<SelectDropDown
				onBlur={formik.handleBlur}
				error={error.city}
				onChange={(e) => handleChange(e)}
				name="city"
				value={singleCustomer?.city}
				initialVal="Select city"
				menuItems={cityName}
				label="City"
			/>
			<Stack sx={{ gridColumn: "1/-1" }}>
				<TextInput
					label="Address"
					name="address"
					value={singleCustomer?.address}
					onBlur={formik.handleBlur}
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
					value={singleCustomer?.note}
					onBlur={formik.handleBlur}
					onChange={(e) => handleChange(e)}
				/>
				{error.note && (
					<Typography component="span" fontSize={13} color="red">
						{error.note}
					</Typography>
				)}
			</Stack>
			<SelectDropDown
				onBlur={formik.handleBlur}
				error={error.catagory}
				onChange={(e) => handleChange(e)}
				name="catagory"
				value={singleCustomer?.catagory}
				initialVal="Other"
				menuItems={["Other", "Demolition"]}
				label="Interested Category"
			/>
			<TextInput
				label="Other"
				name="other"
				value={singleCustomer?.other}
				onBlur={formik.handleBlur}
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
				onBlur={formik.handleBlur}
				error={error.page}
				onChange={(e) => handleChange(e)}
				name="page"
				value={singleCustomer?.page}
				menuItems={pages}
				label="URL should go to"
			/>
			<Button
				type="submit"
				variant="contained"
				sx={{ width: "fit-content", gridColumn: 2 / -1, justifySelf: "end" }}
			>
				Create
			</Button>
		</Stack>
	);
}
