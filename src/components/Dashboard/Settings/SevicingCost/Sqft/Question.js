import { useGlobalState } from "@/Context/GlobalStateProvider/GlobalStateProvider";
import AddIcon from "@mui/icons-material/Add";
import { Button, Input, InputLabel, ListItem } from "@mui/material";
import Options from "./Options";
import PerSqft from "./PerSqft";

export default function Question({ quesitionName, questionId }) {
	const { tilesGobalState, dispatch } = useGlobalState();

	const handleChange = (e) => {
		dispatch({
			type: "SET_TILES_INPUT_GLOBAL_STATE",
			payload: e.target,
		});
	};

	const handleIncrement = () => {
		dispatch({
			type: "SET_INCREMENT_VALUE",
			payload: { questionId, id: Date.now() },
		});
	};

	return (
		<ListItem
			sx={{
				padding: "30px 10px",
				display: "flex",
				gap: 2,
				flexDirection: "column",
				borderBottom: "1px solid",
			}}
		>
			<InputLabel fontWeight="500">
				How much do you charge to {quesitionName}
			</InputLabel>
			<Options questionId={questionId} />
			{tilesGobalState.answer[questionId] === "Flat Rate" && (
				<Input
					disableUnderline
					name={questionId}
					value={tilesGobalState.input[questionId]}
					onChange={handleChange}
					sx={{ border: "1px solid", padding: "4px", minWidth: 200 }}
				/>
			)}
			{tilesGobalState.answer[questionId] === "Square Foot" && (
				<>
					{tilesGobalState.incrementBoxes[questionId]?.map((sqft, i) => (
						<PerSqft questionId={questionId} sqft={sqft} key={i} />
					))}
					<Button
						variant="text"
						startIcon={<AddIcon />}
						sx={{ color: "gray" }}
						onClick={handleIncrement}
					>
						Add Increment
					</Button>
				</>
			)}
		</ListItem>
	);
}
