import { selectCustomerFn } from '@/Context/CustomersProvider/action';
import { useCustomers } from '@/Context/CustomersProvider/CustomersProvider';
import { Stack, Typography } from '@mui/material';

export default function CustomerItem({ customer }) {
   const { dispatch } = useCustomers();

   const handleClick = () => {
      dispatch(selectCustomerFn(customer.id));
   };

   return (
      <Stack
         component="button"
         type="button"
         onClick={handleClick}
         padding="10px 20px"
         fontWeight={500}
         bgcolor="white"
         fontSize={17}
         minWidth="max-content"
         sx={{ cursor: 'pointer' }}
      >
         <Typography component="div" fontSize={20}>
            Customer {customer.id}
         </Typography>
         <Typography component="p" color="gary">
            {customer.fname ? customer.fname : customer.first_name} {customer.lname ? customer.lname :customer.last_name}
         </Typography>
         <Typography component="p" color="gary">
            {customer.phone}
         </Typography>
      </Stack>
   );
}
