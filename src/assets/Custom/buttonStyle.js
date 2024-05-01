const { styled, Button } = require("@mui/material");

const LinkButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText("#fff"),
	backgroundColor: "transparent",
	textTransform: "inherit",
	fontSize: "16px",
}));

export { LinkButton };

//
