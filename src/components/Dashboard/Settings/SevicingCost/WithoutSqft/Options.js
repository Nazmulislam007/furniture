import { CustomMenuItem, CustomSelect } from "@/assets/Custom/selectiStyle";

export default function Options({ options, ...rest }) {
	return (
		<CustomSelect
			disableUnderline
			variant="standard"
			sx={{ fontWeight: "400", padding: "5px 10px", minWidth: 200 }}
			{...rest}
		>
			{options.map((val, i) => (
				<CustomMenuItem value={val} key={i}>
					{val}
				</CustomMenuItem>
			))}
		</CustomSelect>
	);
}
