import { useGlobalState } from "@/Context/GlobalStateProvider/GlobalStateProvider";
import { apiUrl } from "@/Context/constant";
import { getServiceCost } from "@/Context/utility";
import { Button, Input, List, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Options from "./Options";
import Question from "./Question";

const SERVICE = "Vanities";
const options = ["Free", "Flat Rate", "Not Available"];

export default function BathroomVanityCost({ setSettings, setCategory }) {
	const CUSTOMER_ID = JSON.parse(sessionStorage.user).customer_id;
	const { serviceCost, dispatchServiceCost } = useGlobalState();
	const [responseData, setResponseData] = useState({});
	const service = serviceCost?.find(
		(serv) => serv.customerId === CUSTOMER_ID && serv.service === SERVICE,
	);

	const [userData, setUserData] = useState({});
	const [question, setQuestion] = useState({
		deliver: "Free",
		install: "Free",
		remove: "Free",
		dispose: "Free",
	});

	const [inputVal, setInputVal] = useState({
		deliver: "",
		install: "",
		remove: "",
		dispose: "",
	});
	const handleQuestion = (obj) => {
		setQuestion({
			...question,
			deliver: Object.keys(obj.deliver)[0],
			remove: Object.keys(obj.remove)[0],
			dispose: Object.keys(obj.dispose)[0],
			install: Object.keys(obj.install)[0],
		});
	};
	const handleInputVal = (obj) => {
		setInputVal({
			...question,
			deliver: Object.values(obj.deliver)[0],
			remove: Object.values(obj.remove)[0],
			dispose: Object.values(obj.dispose)[0],
			install: Object.values(obj.install)[0],
		});
	};
	const getServiceCostData = async (obj) => {
		const result = await getServiceCost(obj);
		if (result.length > 0) {
			const deliver = JSON.parse(result[0].deliver);
			const dispose = JSON.parse(result[0].dispose);
			const install = JSON.parse(result[0].install);
			const remove = JSON.parse(result[0].remove);
			const service = result[0].service;
			const categoryId = result[0].category_id;
			const customerId = result[0].customer_id;
			const settings = result[0].settings ? JSON.parse(result[0].settings) : "";
			setSettings(settings);

			const newData = {
				deliver,
				dispose,
				install,
				service,
				customerId,
				categoryId,
				remove,
			};
			handleQuestion(newData);
			handleInputVal(newData);
			setResponseData(newData);
		}
	};
	useEffect(() => {
		setSettings("");
		setCategory(SERVICE);
		const userData =
			typeof window !== "undefined"
				? JSON.parse(window.sessionStorage.getItem("user"))
				: null;
		setUserData(userData);
		getServiceCostData({
			selected: "vanities",
			customerId: userData?.customer_id,
		});
	}, []);

	useEffect(() => {
		if (!responseData) {
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
		deliver: {
			[question.deliver]:
				question.deliver !== "Flat Rate" ? 0 : inputVal.deliver,
		},
		install: {
			[question.install]:
				question.install !== "Flat Rate" ? 0 : inputVal.install,
		},
		remove: {
			[question.remove]: question.remove !== "Flat Rate" ? 0 : inputVal.remove,
		},
		dispose: {
			[question.dispose]:
				question.dispose !== "Flat Rate" ? 0 : inputVal.dispose,
		},
	};
	const addServiceHandler = async () => {
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
					Bathroom Vanity - Service Costs
				</Typography>
				<Typography component="span" fontSize={14} color="gray">
					Settings for your Bathroom Vanity options
				</Typography>
			</Stack>
			<List sx={{ display: "flex", flexDirection: "column" }}>
				<Question quesitionName="deliver a new vanity?">
					<Options
						options={options}
						value={question.deliver}
						name="deliver"
						onChange={handleQuestionChange}
					/>
					{question.deliver === "Flat Rate" && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.deliver}
							name="deliver"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="install a new vanity?">
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

				<Question quesitionName="remove an existing vanity?">
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

				<Question quesitionName="dispose an existing vanity?">
					<Options
						options={options}
						value={question.dispose}
						name="dispose"
						onChange={handleQuestionChange}
					/>
					{question.dispose === "Flat Rate" && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.dispose}
							name="dispose"
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
