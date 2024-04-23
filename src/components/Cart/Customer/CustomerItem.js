import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function CustomerItem({ customer }) {
  const router = useRouter();

  return (
    <Stack
      component="button"
      type="button"
      padding="10px 20px"
      fontWeight={500}
      bgcolor="white"
      fontSize={17}
      minWidth="max-content"
      onClick={() => router.push(`/dashboard/customer-cart/${customer.id}`)}
    >
      {/* <Typography component="div" fontSize={20}>
        Customer {customer.id}
      </Typography> */}
      <Typography component="p" color="gary">
        {customer.fname ? customer.fname : customer.first_name}{" "}
        {customer.lname ? customer.lname : customer.last_name}
      </Typography>
      <Typography component="p" color="gary">
        {customer.page}
      </Typography>
    </Stack>
  );
}
