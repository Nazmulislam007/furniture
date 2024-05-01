import { TAX_PERCENT } from "@/Context/constant";
import { Box, Stack } from "@mui/material";

export default function SubTotal({ subtotal, tax, total }) {
	return (
		<Stack py={3}>
			<Stack
				direction="row"
				justifyContent="space-between"
				sx={{ fontWeight: 600 }}
			>
				<Box>SUBTOTAL</Box>
				<Box>${subtotal}</Box>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				sx={{ fontWeight: 600 }}
			>
				<Box>TAX ({`${TAX_PERCENT}`}%)</Box>
				<Box>${tax}</Box>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				sx={{ fontWeight: 600 }}
			>
				<Box>TOTAL</Box>
				<Box>${total}</Box>
			</Stack>
		</Stack>
	);
}
