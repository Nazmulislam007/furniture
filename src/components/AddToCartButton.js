import { Button } from "@mui/material";

export default function AddToCartButton({ isExistProduct, size, ...rest }) {
	return (
		<Button
			variant="button"
			sx={{
				marginBottom: 3,
				background: isExistProduct ? "red" : "black",
				color: "white",
				width: "100%",
				maxWidth: size,
				"&:hover": {
					backgroundColor: isExistProduct ? "red" : "black",
				},
			}}
			{...rest}
		>
			{isExistProduct ? "Remove from cart" : "Add To Cart"}
		</Button>
	);
}
