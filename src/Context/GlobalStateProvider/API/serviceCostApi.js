const serviceCostApi = [
	{
		customerId: 23,
		service: "Tiles",
		deliver: {
			"Square Foot": [
				{
					id: 1,
					totalSqft: 100,
					perSqft: 2,
				},
			],
		},
		install: {
			"Square Foot": [
				{
					id: 2,
					totalSqft: 50,
					perSqft: 1.5,
				},
			],
		},
		remove: { Free: "" },
		dispose: { Free: "" },
		underlayment: { "Flat Rate": "225" },
	},
	{
		customerId: 23,
		service: "Flooring",
		deliver: { Free: "" },
		install: {
			"Square Foot": [
				{
					id: 2,
					totalSqft: 50,
					perSqft: 1.5,
				},
			],
		},
		remove: { Free: "" },
		dispose: {
			"Square Foot": [
				{
					id: 1,
					totalSqft: 100,
					perSqft: 2,
				},
			],
		},
		underlayment: { "Flat Rate": "225" },
	},
	{
		customerId: 23,
		service: "Countertop",
		deliver: { Free: "" },
		install: {
			Free: "",
		},
		remove: {
			"Square Foot": [
				{
					id: 2,
					totalSqft: 50,
					perSqft: 1.5,
				},
			],
		},
		dispose: {
			"Square Foot": [
				{
					id: 1,
					totalSqft: 100,
					perSqft: 2,
				},
			],
		},
		underlayment: { "Flat Rate": "225" },
	},
	{
		customerId: 23,
		service: "Vanities",
		deliver: { Free: 0 },
		install: { "Flat Rate": 230 },
		remove: { Free: 0 },
		dispose: { "Not Available": 0 },
	},
	{
		customerId: 24,
		service: "Vanities",
		deliver: { Free: 0 },
		install: { "Flat Rate": 220 },
		remove: { Free: 0 },
		dispose: { "Not Available": 0 },
	},
	{
		customerId: 23,
		service: "Bathtub",
		deliver: { Free: 0 },
		install: { "Flat Rate": 220 },
		removeBathtub: { Free: 0 },
		removeShower: { "Flat Rate": 10 },
		dispose: { "Not Available": 0 },
	},
	{
		customerId: 23,
		service: "Kitchen Faucet",
		install: { "Flat Rate": 220 },
		remove: { Free: 0 },
	},
	{
		customerId: 23,
		service: "Shower Kit",
		deliver: { Free: 0 },
		install: { "Flat Rate": 30 },
		removeBathtub: { Free: 0 },
		removeShower: { "Flat Rate": 10 },
		dispose: { "Not Available": 0 },
	},
	{
		customerId: 23,
		service: "Cabinets",
		deliver: { Free: 0 },
		install: { "Flat Rate": 30 },
		remove: { "Per Piece": 100 },
		dispose: { "Flat Rate": 10 },
		lighting: { "Not Available": 0 },
		paintBoxes: { "Per Piece": 22 },
		paintDoors: { "Not Available": 0 },
	},
];

export { serviceCostApi };

//
