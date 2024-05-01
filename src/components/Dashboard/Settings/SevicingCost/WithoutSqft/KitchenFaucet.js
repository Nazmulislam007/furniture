import { useGlobalState } from "@/Context/GlobalStateProvider/GlobalStateProvider";
import { apiUrl } from "@/Context/constant";
import { getServiceCost } from "@/Context/utility";
import { Button, Input, List, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Options from "./Options";
import Question from "./Question";

const SERVICE = "Kitchen Faucets";
const options = ["Free", "Flat Rate", "Not Available"];

export default function KitchenFaucetCost({ setCategory, setSettings }) {
	const CUSTOMER_ID = JSON.parse(sessionStorage.user).customer_id;
	const { serviceCost, dispatchServiceCost } = useGlobalState();

	const service = serviceCost?.find(
		(serv) => serv.customerId === CUSTOMER_ID && serv.service === SERVICE,
	);
	const [userData, setUserData] = useState({});
	const [responseData, setResponseData] = useState({});
	const [question, setQuestion] = useState({
		install: "Free",
		remove: "Free",
	});

	const [inputVal, setInputVal] = useState({
		install: "",
		remove: "",
	});

	const handleQuestion = (obj) => {
		setQuestion({
			...question,
			remove: Object.keys(obj.remove)[0],
			install: Object.keys(obj.install)[0],
		});
	};
	const handleInputVal = (obj) => {
		setInputVal({
			...question,
			remove: Object.values(obj.remove)[0],
			install: Object.values(obj.install)[0],
		});
	};

	const getServiceCostData = async (obj) => {
		const result = await getServiceCost(obj);
		if (result.length > 0) {
			const install = JSON.parse(result[0].install);
			const remove = JSON.parse(result[0].remove);
			const service = result[0].service;
			const categoryId = result[0].category_id;
			const customerId = result[0].customer_id;

			const settings = result[0].settings ? JSON.parse(result[0].settings) : "";
			setSettings(settings);

			const newData = { install, service, customerId, categoryId, remove };
			handleQuestion(newData);
			handleInputVal(newData);
			setResponseData(newData);
		}
	};
	useEffect(() => {
		setCategory(SERVICE);
		setSettings("");
		const userData =
			typeof window !== "undefined"
				? JSON.parse(window.sessionStorage.getItem("user"))
				: null;
		setUserData(userData);
		getServiceCostData({
			selected: "kitchenFaucets",
			customerId: userData?.customer_id,
		});
	}, []);
	useEffect(() => {
		if (responseData && inputVal.install !== "" && inputVal.remove !== "") {
			handleQuestion(service);
			handleInputVal(service);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [service]);

	const handleQuestionChange = (e) => {
		setQuestion({
			...question,
			[e.target.name]: e.target.value,
		});
	};

	const handleInputChange = (e) => {
		setInputVal({
			...inputVal,
			[e.target.name]: e.target.value,
		});
	};

	const data = {
		install: {
			[question.install]:
				question.install !== "Flat Rate" ? 0 : inputVal.install,
		},
		remove: {
			[question.remove]: question.remove !== "Flat Rate" ? 0 : inputVal.remove,
		},
	};
	const addServiceHandler = async () => {
		console.log("data", data);
		try {
			const contractorId = userData?.id;
			const apiUrlEndpoint = `${apiUrl}/api/addServices?contractorId=${contractorId}`;

			const serviceInputs = {
				...data,
				service: SERVICE,
				customerId: userData?.customer_id,
			};

			const response = await fetch(apiUrlEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(serviceInputs),
			});
			const res = await response.json();

			if (response.ok) {
				alert(res.message);
			}

			console.log("service cost result", res);
		} catch (error) {
			console.log("error", error);
		}
	};
	const handleClick = () => {
		addServiceHandler();
		dispatchServiceCost({
			type: "SET_SERVICES",
			payload: {
				...data,
				customerId: CUSTOMER_ID,
				service: SERVICE,
			},
		});
	};

	return (
		<Stack
			spacing={3}
			sx={{ bgcolor: "white", padding: 4, flex: 1, width: "100%" }}
		>
			<Stack>
				<Typography component="p" fontSize={22} fontWeight="500">
					Kitchen Faucet - Service Costs
				</Typography>
				<Typography component="span" fontSize={14} color="gray">
					Settings for your Kitchen Faucet options
				</Typography>
			</Stack>
			<List sx={{ display: "flex", flexDirection: "column" }}>
				<Question quesitionName="install a new Kitchen Faucet?">
					<Options
						options={options}
						value={question.install}
						name="install"
						onChange={handleQuestionChange}
					/>
					{question.install === "Flat Rate" && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.install}
							name="install"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="remove an old Kitchen Faucet?">
					<Options
						options={options}
						value={question.remove}
						name="remove"
						onChange={handleQuestionChange}
					/>
					{question.remove === "Flat Rate" && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.remove}
							name="remove"
							onChange={handleInputChange}
						/>
					)}
				</Question>
			</List>
			<Button type="button" variant="contained" onClick={handleClick}>
				Submit
			</Button>
		</Stack>
	);
}
