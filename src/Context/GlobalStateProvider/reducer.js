import { TILES_ANS_GLOBAL_STATE } from "./actionType";

const reducer = (state, { type, payload }) => {
	switch (type) {
		case TILES_ANS_GLOBAL_STATE: {
			const { name, value } = payload;
			return {
				...state,
				tilesGobalState: {
					...state.tilesGobalState,
					answer: {
						...state.tilesGobalState.answer,
						[name]: value,
					},
				},
			};
		}

		case "UPDATE_COST_GLOBAL_STATE": {
			return {
				...state,
				tilesGobalState: payload,
			};
		}

		case "SET_TILES_INPUT_GLOBAL_STATE": {
			const { name, value } = payload;
			return {
				...state,
				tilesGobalState: {
					...state.tilesGobalState,
					input: {
						...state.tilesGobalState.input,
						[name]: value,
					},
				},
			};
		}
		case "SET_INCREMENT_VALUE": {
			const obj = {
				id: payload.id,
				totalSqft: "",
				perSqft: "",
			};
			const existingBoxes = Array.isArray(
				state.tilesGobalState.incrementBoxes[payload.questionId],
			)
				? state.tilesGobalState.incrementBoxes[payload.questionId]
				: [];

			return {
				...state,
				tilesGobalState: {
					...state.tilesGobalState,
					incrementBoxes: {
						...state.tilesGobalState.incrementBoxes,
						[payload.questionId]: [...existingBoxes, obj],
					},
				},
			};
		}

		case "HANDLE_CHANGE_INCREMENT_VALUE": {
			console.log(payload);
			return {
				...state,
				tilesGobalState: {
					...state.tilesGobalState,
					incrementBoxes: {
						...state.tilesGobalState.incrementBoxes,
						[payload.questionId]: [
							...state.tilesGobalState.incrementBoxes[
								payload.questionId
							].filter((item) => item.id !== payload.id),
							{
								id: payload.id,
								totalSqft: +payload.totalSqft,
								perSqft: +payload.perSqft,
							},
						],
					},
				},
			};
		}

		case "DELETE_SQFT": {
			return {
				...state,
				tilesGobalState: {
					...state.tilesGobalState,
					incrementBoxes: {
						...state.tilesGobalState.incrementBoxes,
						[payload.questionId]: state.tilesGobalState.incrementBoxes[
							payload.questionId
						].filter((sqft) => sqft.id !== payload.id),
					},
				},
			};
		}

		// add services
		case "SET_SERVICES": {
			const newState = state.filter(
				(info) =>
					!(
						info.service === payload.service &&
						info.customerId === payload.customerId
					),
			);

			return [...newState, payload];
		}

		default:
			return state;
	}
};

export default reducer;
