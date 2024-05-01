import { useGlobalState } from "@/Context/GlobalStateProvider/GlobalStateProvider";
import { TILES_ANS_GLOBAL_STATE } from "@/Context/GlobalStateProvider/actionType";
import { CustomMenuItem, CustomSelect } from "@/assets/Custom/selectiStyle";

export default function Options({ questionId }) {
	const { tilesGobalState, dispatch } = useGlobalState();

	const handleChange = (e) => {
		dispatch({
			type: TILES_ANS_GLOBAL_STATE,
			payload: e.target,
		});
	};

	return (
		<CustomSelect
			disableUnderline
			variant="standard"
			name={questionId}
			value={tilesGobalState.answer[questionId]}
			onChange={handleChange}
			sx={{ fontWeight: "400", padding: "5px 10px", minWidth: 200 }}
		>
			{["Free", "Square Foot", "Flat Rate", "Not Available"].map((val, i) => (
				<CustomMenuItem value={val} key={i}>
					{val}
				</CustomMenuItem>
			))}
		</CustomSelect>
	);
}
