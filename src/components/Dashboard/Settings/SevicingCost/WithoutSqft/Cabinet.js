import { useGlobalState } from "@/Context/GlobalStateProvider/GlobalStateProvider";
import { apiUrl } from "@/Context/constant";
import { getServiceCost } from "@/Context/utility";
import { Button, Input, List, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Options from "./Options";
import Question from "./Question";

const SERVICE = "Cabinets";
const options = ["Free", "Per Piece", "Flat Rate", "Not Available"];

export default function CabinetCost({ setCategory, setSettings }) {
	const { serviceCost, dispatchServiceCost } = useGlobalState();
	const CUSTOMER_ID = JSON.parse(sessionStorage.user).customer_id;
	const service = serviceCost?.find(
		(serv) => serv.customerId === CUSTOMER_ID && serv.service === SERVICE,
	);
	const [userData, setUserData] = useState({});
	const [responseData, setResponseData] = useState({});
	const [question, setQuestion] = useState({
		deliver: "Free",
		install: "Free",
		remove: "Free",
		dispose: "Free",
		lighting: "Free",
		paintBoxes: "Free",
		paintDoors: "Free",
	});

	const [inputVal, setInputVal] = useState({
		deliver: "",
		install: "",
		remove: "",
		dispose: "",
		lighting: "",
		paintBoxes: "",
		paintDoors: "",
	});

	const handleQuestion = (obj) => {
		setQuestion({
			...question,
			deliver: Object.keys(obj.deliver)[0],
			install: Object.keys(obj.install)[0],
			dispose: Object.keys(obj.dispose)[0],
			paintDoors: Object.keys(obj.paintDoors)[0],
			paintBoxes: Object.keys(obj.paintBoxes)[0],
			lighting: Object.keys(obj.lighting)[0],
		});
	};
	const handleInputVal = (obj) => {
		setInputVal({
			...question,
			deliver: Object.values(obj.deliver)[0],
			install: Object.values(obj.install)[0],
			paintDoors: Object.values(obj.paintDoors)[0],
			paintBoxes: Object.values(obj.paintBoxes)[0],
			dispose: Object.values(obj.dispose)[0],
			lighting: Object.values(obj.lighting)[0],
		});
	};

	const getServiceCostData = async (obj) => {
		const result = await getServiceCost(obj);
		if (result.length > 0) {
			const install = JSON.parse(result[0].install);
			const deliver = JSON.parse(result[0].deliver);
			const paintDoors = JSON.parse(result[0].paintDoors);
			const paintBoxes = JSON.parse(result[0].paintBoxes);
			const lighting = JSON.parse(result[0].lighting);
			const dispose = JSON.parse(result[0].dispose);
			const service = result[0].service;
			const categoryId = result[0].category_id;
			const customerId = result[0].customer_id;

			const settings = result[0].settings ? JSON.parse(result[0].settings) : "";
			setSettings(settings);

			const newData = {
				install,
				service,
				customerId,
				categoryId,
				deliver,
				paintDoors,
				paintBoxes,
				dispose,
				lighting,
			};
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
			selected: "cabinets",
			customerId: userData?.customer_id,
		});
	}, []);

	useEffect(() => {
		if (responseData && inputVal.install !== "" && inputVal.paintBoxes !== "") {
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
				question.deliver !== "Flat Rate" || question.deliver !== "Per Piece"
					? inputVal.deliver
					: 0,
		},
		install: {
			[question.install]:
				question.install !== "Flat Rate" || question.deliver !== "Per Piece"
					? inputVal.install
					: 0,
		},
		remove: {
			[question.remove]:
				question.remove !== "Flat Rate" || question.deliver !== "Per Piece"
					? inputVal.remove
					: 0,
		},
		dispose: {
			[question.dispose]:
				question.dispose !== "Flat Rate" || question.deliver !== "Per Piece"
					? inputVal.dispose
					: 0,
		},
		lighting: {
			[question.lighting]:
				question.lighting !== "Flat Rate" || question.deliver !== "Per Piece"
					? inputVal.lighting
					: 0,
		},
		paintDoors: {
			[question.paintDoors]:
				question.paintDoors !== "Flat Rate" || question.deliver !== "Per Piece"
					? inputVal.paintDoors
					: 0,
		},
		paintBoxes: {
			[question.paintBoxes]:
				question.paintBoxes !== "Flat Rate" || question.deliver !== "Per Piece"
					? inputVal.paintBoxes
					: 0,
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
				<Question quesitionName="deliver a new cabinet?">
					<Options
						options={options}
						value={question.deliver}
						name="deliver"
						onChange={handleQuestionChange}
					/>
					{(question.deliver === "Flat Rate" ||
						question.deliver === "Per Piece") && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.deliver}
							name="deliver"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="install a new cabinet?">
					<Options
						options={options}
						value={question.install}
						name="install"
						onChange={handleQuestionChange}
					/>
					{(question.install === "Flat Rate" ||
						question.install === "Per Piece") && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.install}
							name="install"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="remove an existing cabinet?">
					<Options
						options={options}
						value={question.remove}
						name="remove"
						onChange={handleQuestionChange}
					/>
					{(question.remove === "Flat Rate" ||
						question.remove === "Per Piece") && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.remove}
							name="remove"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="dispose an old cabinet?">
					<Options
						options={options}
						value={question.dispose}
						name="dispose"
						onChange={handleQuestionChange}
					/>
					{(question.dispose === "Flat Rate" ||
						question.dispose === "Per Piece") && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.dispose}
							name="dispose"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="add lighting to cabinet?">
					<Options
						options={options}
						value={question.lighting}
						name="lighting"
						onChange={handleQuestionChange}
					/>
					{(question.lighting === "Flat Rate" ||
						question.lighting === "Per Piece") && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.lighting}
							name="lighting"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="paint new cabinet doors?">
					<Options
						options={options}
						value={question.paintDoors}
						name="paintDoors"
						onChange={handleQuestionChange}
					/>
					{(question.paintDoors === "Flat Rate" ||
						question.paintDoors === "Per Piece") && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.paintDoors}
							name="paintDoors"
							onChange={handleInputChange}
						/>
					)}
				</Question>

				<Question quesitionName="paint new cabinet boxes?">
					<Options
						options={options}
						value={question.paintBoxes}
						name="paintBoxes"
						onChange={handleQuestionChange}
					/>
					{(question.paintBoxes === "Flat Rate" ||
						question.paintBoxes === "Per Piece") && (
						<Input
							disableUnderline
							sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
							value={inputVal.paintBoxes}
							name="paintBoxes"
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
