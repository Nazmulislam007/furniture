import { query } from "@/lib/db";

export default async function handler(req, res) {
	try {
		let {
			customerId,
			category_id,
			deliver,
			dispose,
			install,
			service,
			remove,
			underlayment,
			removeShower,
			removeBathtub,
			paintDoors,
			lighting,
			paintBoxes,
		} = req.body;
		const contractorId = +req.query.contractorId;

		if (contractorId) {
			deliver = req.body.deliver
				? JSON.stringify(req.body.deliver)
				: { Free: "0" };
			dispose = req.body.dispose
				? JSON.stringify(req.body.dispose)
				: { Free: "0" };
			install = req.body.install
				? JSON.stringify(req.body.install)
				: { Free: "0" };
			remove = req.body.remove
				? JSON.stringify(req.body.remove)
				: { Free: "0" };
			removeBathtub = req.body.removeBathtub
				? JSON.stringify(req.body.removeBathtub)
				: { Free: "0" };
			removeShower = req.body.removeShower
				? JSON.stringify(req.body.removeShower)
				: { Free: "0" };
			paintBoxes = req.body.paintBoxes
				? JSON.stringify(req.body.paintBoxes)
				: { Free: "0" };
			lighting = req.body.lighting
				? JSON.stringify(req.body.lighting)
				: { Free: "0" };
			paintDoors = req.body.paintDoors
				? JSON.stringify(req.body.paintDoors)
				: { Free: "0" };
			const underlayment = req.body.underlayment
				? JSON.stringify(req.body.underlayment)
				: { Free: "0" };
			service = req.body.service;
			// get service category id
			const category = await query({
				query: `SELECT * FROM categories WHERE page_name = '${service}'`,
			});
			const categoryId = category[0]?.id;

			let sqlQuery = "INSERT INTO `service_cost`";
			let valueParams = [];
			if (service === "Bathtub") {
				sqlQuery +=
					"(`contractor_id`, `customer_id`, `category_id`, `deliver`, `dispose`, `install`, `removeShower`, `removeBathtub`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
				valueParams = [
					contractorId,
					customerId,
					categoryId,
					deliver,
					dispose,
					install,
					removeShower,
					removeBathtub,
				];
			} else if (
				service === "Tiles" ||
				service === "Countertops" ||
				service === "Flooring"
			) {
				sqlQuery +=
					"(`contractor_id`, `customer_id`, `category_id`, `deliver`, `dispose`, `install`, `remove`) VALUES (?, ?, ?, ?, ?, ?, ?)";
				valueParams = [
					contractorId,
					customerId,
					categoryId,
					deliver,
					install,
					dispose,
					remove,
				];
			} else if (service === "Vanities") {
				sqlQuery +=
					"(`contractor_id`, `customer_id`, `category_id`, `deliver`, `dispose`, `install`, `remove`) VALUES (?, ?, ?, ?, ?, ?, ?)";
				valueParams = [
					contractorId,
					customerId,
					categoryId,
					deliver,
					install,
					dispose,
					remove,
				];
			} else if (service === "Kitchen Faucets") {
				sqlQuery +=
					"(`contractor_id`, `customer_id`, `category_id`, `install`, `remove`) VALUES (?, ?, ?, ?, ?)";
				valueParams = [contractorId, customerId, categoryId, install, remove];
			} else if (service === "Shower Kit") {
				sqlQuery +=
					"(`contractor_id`, `customer_id`, `category_id`, `deliver`, `dispose`, `install`, `removeShower`, `removeBathtub`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
				valueParams = [
					contractorId,
					customerId,
					categoryId,
					deliver,
					dispose,
					install,
					removeShower,
					removeBathtub,
				];
			} else if (service === "Cabinets") {
				sqlQuery +=
					"(`contractor_id`, `customer_id`, `category_id`, `deliver`, `dispose`, `install`, `paintDoors`, `paintBoxes`,`lighting`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
				valueParams = [
					contractorId,
					customerId,
					categoryId,
					deliver,
					dispose,
					install,
					paintDoors,
					paintBoxes,
					lighting,
				];
			}

			const existingServiceCost = await query({
				query: `SELECT * FROM service_cost WHERE category_id = ? AND customer_id = ? AND  contractor_id = ?`,
				values: [categoryId, customerId, contractorId],
			});

			// update service cost record if exists
			if (existingServiceCost.length > 0) {
				if (
					service === "Tiles" ||
					service === "Countertops" ||
					service === "Flooring"
				) {
					const updateQuery = `UPDATE service_cost SET deliver = ?, dispose = ?, install = ?, remove = ?, underlayment = ?  WHERE service_cost.id = ?`;
					const result = await query({
						query: updateQuery,
						values: [
							deliver,
							dispose,
							install,
							remove,
							underlayment,
							existingServiceCost[0].id,
						],
					});
				} else if (service === "Bathtub" || service === "Shower Kit") {
					const updateQuery = `UPDATE service_cost SET deliver = ?, dispose = ?, install = ?, removeShower = ?, removeBathtub = ?  WHERE service_cost.id = ?`;
					const result = await query({
						query: updateQuery,
						values: [
							deliver,
							dispose,
							install,
							removeShower,
							removeBathtub,
							existingServiceCost[0].id,
						],
					});
				} else if (service === "Vanities") {
					const updateQuery = `UPDATE service_cost SET deliver = ?, dispose = ?, install = ?, remove = ?  WHERE service_cost.id = ?`;
					const result = await query({
						query: updateQuery,
						values: [
							deliver,
							dispose,
							install,
							remove,
							existingServiceCost[0].id,
						],
					});
				} else if (service === "Kitchen Faucets") {
					const updateQuery = `UPDATE service_cost SET  install = ?, remove = ?  WHERE service_cost.id = ?`;
					const result = await query({
						query: updateQuery,
						values: [install, remove, existingServiceCost[0].id],
					});
				} else if (service === "Cabinets") {
					const updateQuery = `UPDATE service_cost SET deliver = ?, dispose = ?, install = ?, paintDoors = ?, paintBoxes = ?,lighting = ?  WHERE service_cost.id = ?`;
					const result = await query({
						query: updateQuery,
						values: [
							deliver,
							dispose,
							install,
							paintDoors,
							paintBoxes,
							lighting,
							existingServiceCost[0].id,
						],
					});
				}
				return res
					.status(200)
					.json({ message: "Service cost update successfully" });
			}

			const querySql =
				"INSERT INTO `service_cost`(`contractor_id`, `customer_id`, `category_id`, `deliver`, `dispose`, `install`, `remove`, `removeShower`, `removeBathtub`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

			// const valueParams = [contractorId, customerId, categoryId, deliver, dispose, install, remove, removeShower, removeBathtub];
			const data = await query({ query: sqlQuery, values: valueParams });
			console.log("DATA", data);
			return res
				.status(200)
				.json({ id: data.insertId, message: "Add successfully" });
		} else {
			return res.status(401).json({ message: "Please login to add services." });
		}
	} catch (error) {
		console.log("error", error);
	}
}
