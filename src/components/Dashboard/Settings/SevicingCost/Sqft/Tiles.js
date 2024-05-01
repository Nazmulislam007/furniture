import { useGlobalState } from "@/Context/GlobalStateProvider/GlobalStateProvider";
import { apiUrl } from "@/Context/constant";
import { getServiceCost } from "@/Context/utility";
import { Button, List, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Question from "./Question";

const questions = [
	{ question: "deliver new tiles?", questionId: "deliver" },
	{ question: "install new tiles?", questionId: "install" },
	{ question: "remove existing tiles?", questionId: "remove" },
	{ question: "install underlayment?", questionId: "underlayment" },
	{ question: "dispose old floors?", questionId: "dispose" },
];

const SERVICE = "Tiles";
export default function TilesCost({ setCategory, setSettings }) {
	const [userData, setUserData] = useState({});
	const [tilesServiceCost, setTilesServiceCost] = useState({});

	const { tilesGobalState, dispatchServiceCost, serviceCost, dispatch } =
		useGlobalState() || {};

	useEffect(() => {
		setCategory(SERVICE);
		setSettings("");
		const userData =
			typeof window !== "undefined"
				? JSON.parse(window.sessionStorage.getItem("user"))
				: null;
		setUserData(userData);
		getServiceCostData({
			selected: "tiles",
			customerId: userData?.customer_id,
		});
	}, []);
	const CUSTOMER_ID = userData?.customer_id;
	// const matchServiceCost = serviceCost?.find((service) => service.customerId === CUSTOMER_ID && service.service === SERVICE);
	// formating service cost from global state to store store in database;

	Object.keys(tilesGobalState.answer).forEach((key) => {
		tilesServiceCost[key] = {
			[tilesGobalState.answer[key]]:
				tilesGobalState.answer[key] === "Square Foot"
					? Array.isArray(tilesGobalState.incrementBoxes[key])
						? [...tilesGobalState.incrementBoxes[key]]
						: tilesGobalState.incrementBoxes[key]
					: tilesGobalState.input[key],
		};
	});
	// formating service cost from database to store global state
	// const serviceState = useMemo(() => ({ answer: {}, input: {}, incrementBoxes: {} }), []);
	// matchServiceCost && Object.keys(tilesServiceCost).forEach((key) => {
	//    const innerObj = tilesServiceCost[key]; /* {"Free": ""} */
	//    const innerKey = Object.keys(innerObj)[0]; /* "Free" */
	//    serviceState.answer[key] = innerKey;
	//    serviceState.input[key] = innerObj['Flat Rate'] || '';
	//    serviceState.incrementBoxes[key] = innerObj['Square Foot'] || [];
	// });

	const getServiceCostData = async (obj) => {
		const result = await getServiceCost(obj);

		if (result && result.length > 0) {
			const deliver = JSON.parse(result[0].deliver);
			const dispose = JSON.parse(result[0].dispose);
			const install = JSON.parse(result[0].install);
			const service = result[0].service;
			const categoryId = result[0].category_id;
			const customerId = result[0].customer_id;
			const settings = result[0].settings ? JSON.parse(result[0].settings) : "";
			setSettings(settings);

			const servicecostobj = {
				deliver,
				dispose,
				install,
				service,
				customerId,
				categoryId,
				remove: { Free: 0 },
				underlayment: { Free: 0 },
			};
			const newData = convertData(result[0]);
			setTilesServiceCost(tilesGobalState);
			dispatch({
				type: "UPDATE_COST_GLOBAL_STATE",
				payload: newData,
			});
		} else {
			setTilesServiceCost(tilesGobalState);
		}
	};
	function convertData(data) {
		const answer = {};
		const input = {};
		const incrementBoxes = {};

		// Helper function to parse the values from the string
		function parseValue(str) {
			let key;
			let value;
			if (str) {
				const parsed = JSON.parse(str);
				key = Object.keys(parsed)[0];
				value = parsed[key];
			}
			return { key, value };
		}
		// Loop through the keys in the original data
		for (const key in data) {
			if (key !== "service") {
				const { key: answerKey, value } = parseValue(data[key]);

				// Fill answer object
				answer[key] = answerKey;

				// Fill input object
				if (value !== "" && answerKey === "Square Foot") {
					incrementBoxes[key] = value;
				}
				if (value !== "" && answerKey !== "Square Foot") {
					input[key] = value;
				}
			}
		}

		// Create the final result object
		const result = {
			answer,
			input,
			incrementBoxes,
		};

		return result;
	}
	const addServiceHandler = async () => {
		try {
			const contractorId = userData?.id;
			const apiUrlEndpoint = `${apiUrl}/api/addServices?contractorId=${contractorId}`;

			const serviceInputs = {
				...tilesServiceCost,
				service: SERVICE,
				customerId: userData?.customer_id,
			};

			console.log("tiles", serviceInputs);

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

	const handleClick = async () => {
		await addServiceHandler();
		dispatchServiceCost({
			type: "SET_SERVICES",
			payload: {
				...tilesGobalState,
				service: SERVICE,
				customerId: userData?.id,
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
					Tiles - Service Costs
				</Typography>
				<Typography component="span" fontSize={14} color="gray">
					Settings for your Tiles options
				</Typography>
			</Stack>
			<List sx={{ display: "flex", flexDirection: "column" }}>
				{questions.map((q, i) => (
					<Question
						quesitionName={q.question}
						questionId={q.questionId}
						key={i}
					/>
				))}
			</List>
			<Button type="button" variant="contained" onClick={handleClick}>
				Submit
			</Button>
		</Stack>
	);
}
