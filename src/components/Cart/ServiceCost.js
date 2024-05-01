/* eslint-disable no-plusplus */
import { useGlobalState } from "@/Context/GlobalStateProvider/GlobalStateProvider";
import { getServiceCost } from "@/Context/utility";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
export default function ServiceCost({ info, setServiceTotal }) {
	const { serviceCost } = useGlobalState();
	const [serviceCost1, setServiceCost1] = useState([]);
	const firstUpdate = useRef(true);

	useEffect(() => {
		getServiceCostData();
	}, []);

	const getServiceCostData = async () => {
		const serviceCostData = await getServiceCost({
			customerId: info.CUSTOMER_ID,
		});
		setServiceCost1(serviceCostData);
	};

	const serviceType = info.type;
	let totalSqft;

	if (info.length === 1) totalSqft = info[0].customerSqft;
	if (info.length > 1)
		totalSqft = info.reduce((prev, next) => prev + next.customerSqft, 0);

	const service = serviceCost1?.find(
		(item) =>
			item?.service.toLowerCase() === serviceType.toLowerCase() &&
			item.customer_id === info.CUSTOMER_ID,
	);

	let closestObjInstall = null;
	let closestObjRemove = null;
	let closestObjDliver = null;
	let serviceInstall = null;
	let serviceRemove = null;
	let serviceDeliver = null;

	if (service) {
		serviceInstall =
			service && (service.install ? JSON.parse(service.install) : "");
		serviceRemove =
			service && (service.remove ? JSON.parse(service.remove) : "");
		serviceDeliver =
			service && (service.deliver ? JSON.parse(service.deliver) : "");
		const findClosestObj = (arr) => {
			let closestObj = null;
			if (arr) {
				for (let i = 0; i < arr.length; i++) {
					const obj = arr[i];
					if (obj.totalSqft <= totalSqft) {
						if (
							closestObj == null ||
							totalSqft - obj.totalSqft < totalSqft - closestObj.totalSqft
						) {
							closestObj = obj;
						}
					} else if (
						closestObj == null ||
						obj.totalSqft - totalSqft < closestObj.totalSqft - totalSqft
					) {
						closestObj = obj;
					}
				}
			}
			return closestObj;
		};
		closestObjInstall = findClosestObj(
			serviceInstall[Object.keys(serviceInstall)[0]],
		);
		closestObjRemove = findClosestObj(
			serviceRemove[Object.keys(serviceRemove)[0]],
		);
		closestObjDliver = findClosestObj(
			serviceDeliver[Object.keys(serviceDeliver)[0]],
		);
	}
	const findServiceType = (type, closestObj) => {
		// console.log("serviceType", serviceType);
		// console.log("cloasestObj", service[type]);

		let serv = {};
		if (service[type]) {
			serv = JSON.parse(service[type]);
		}

		if (Object.keys(serv)[0] === "Flat Rate") {
			return (
				<>
					<Box>
						{Object.values(serv)[0]}{" "}
						<Typography component="span" fontSize={12} fontWeight={500}>
							{Object.keys(serv)[0]}
						</Typography>
					</Box>
					<Box sx={{ justifySelf: "flex-end" }}>{Object.values(serv)[0]}</Box>
				</>
			);
		}

		if (Object.keys(serv)[0] === "Square Foot") {
			return (
				<>
					{" "}
					{Object.values(serv)[0].length > 0 &&
						Object.values(serv)[0].map((ele, i) => {
							return (
								<div key={i}>
									<Box>
										{ele.totalSqft}{" "}
										<Typography component="span" fontSize={12} fontWeight={500}>
											{Object.keys(serv)[0]}
										</Typography>
									</Box>
									<Box sx={{ justifySelf: "flex-end" }}>{ele.perSqft}</Box>
								</div>
							);
						})}
				</>
			);
		}

		if (Object.keys(serv)[0] === "Per Piece") {
			return (
				<>
					<Box>
						{Object.values(serv)[0]}{" "}
						<Typography component="span" fontSize={12} fontWeight={500}>
							{Object.keys(serv)[0]}
						</Typography>
					</Box>
					<Box sx={{ justifySelf: "flex-end" }}>{Object.values(serv)[0]}</Box>
				</>
			);
		}

		return (
			<>
				<Box>{Object.keys(serv)[0]}</Box>
				<Box sx={{ justifySelf: "flex-end" }}>0</Box>
			</>
		);
	};

	let total = 0;

	if (info[0]["sqft/case"]) {
		if (closestObjDliver?.perSqft) {
			total += +closestObjDliver?.perSqft * +totalSqft;
		}
		if (closestObjInstall?.perSqft) {
			total += +closestObjInstall.perSqft * +totalSqft;
		}
		if (closestObjRemove?.perSqft) {
			total += +closestObjRemove.perSqft * +totalSqft;
		}
	}

	if (serviceInstall && Object.keys(serviceInstall)[0] === "Flat Rate") {
		total += +Object.values(serviceInstall)[0];
	}

	if (serviceRemove && Object.keys(serviceRemove)[0] === "Flat Rate") {
		total += +Object.values(serviceRemove)[0];
	}

	if (serviceDeliver && Object.keys(serviceDeliver)[0] === "Flat Rate") {
		total += +Object.values(serviceDeliver)[0];
	}

	if (serviceInstall && Object.keys(serviceInstall)[0] === "Per Piece") {
		total += +Object.values(serviceInstall)[0];
	}

	if (serviceRemove && Object.keys(serviceRemove)[0] === "Per Piece") {
		total += +Object.values(serviceRemove)[0];
	}

	if (serviceDeliver && Object.keys(serviceDeliver)[0] === "Per Piece") {
		total += +Object.values(serviceDeliver)[0];
	}

	useEffect(() => {
		setServiceTotal((prev) => prev + total);
	}, [total]);

	return (
		<Box
			py={2}
			sx={{
				display: "grid",
				gap: "10px 30px",
				gridTemplateColumns: { sm: "repeat(2, 1fr)", xs: "1fr" },
			}}
		>
			<Typography gridColumn="1/-1" variant="p" fontSize={22} fontWeight={500}>
				Service Costs
			</Typography>
			<Stack
				sx={{
					display: "grid",
					gap: 2,
					gridTemplateColumns: "repeat(2, 1fr)",
					fontWeight: 500,
				}}
			>
				<Box>Installation costs</Box>
				{totalSqft ? (
					<Box sx={{ justifySelf: "flex-end" }}>{totalSqft} sq.ft.</Box>
				) : (
					<Box />
				)}
				<Box>Removal</Box>
				{totalSqft ? (
					<Box sx={{ justifySelf: "flex-end" }}>{totalSqft} sq.ft.</Box>
				) : (
					<Box />
				)}
				<Box>Delivery</Box>
				{totalSqft ? (
					<Box sx={{ justifySelf: "flex-end" }}>{totalSqft} sq.ft.</Box>
				) : (
					<Box />
				)}
			</Stack>
			<Stack
				sx={{
					display: "grid",
					gap: 2,
					gridTemplateColumns: "repeat(2, 1fr)",
					fontWeight: 500,
					fontSize: 20,
				}}
			>
				{service && findServiceType("install", closestObjInstall)}
				{service && findServiceType("remove", closestObjRemove)}
				{service && findServiceType("deliver", closestObjDliver)}
			</Stack>
		</Box>
	);
}
