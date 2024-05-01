import { IOSSwitch } from "@/assets/Custom/switchStyle";

const { FormControlLabel } = require("@mui/material");

export default function ToggleSwitch({ name, handleToggleSettings, settings }) {
	return (
		<FormControlLabel
			control={<IOSSwitch sx={{ m: 1 }} />}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				"& .MuiFormControlLabel-label": {
					fontSize: 13,
					marginLeft: 1,
				},
			}}
			checked={settings[name] || false}
			onClick={(e) =>
				handleToggleSettings({ target: { name, checked: e.target.checked } })
			}
		/>
	);
}
