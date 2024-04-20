import { CustomMenuItem, CustomSelect } from '@/assets/Custom/selectiStyle';
import { IOSSwitch } from '@/assets/Custom/switchStyle';
import { apiUrl } from '@/Context/constant';
import { deleteCustomer } from '@/Context/CustomersProvider/action';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Stack, TableCell, TableRow, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardTableRow({ cus, dispatch }) {
   const [state, setState] = useState({
      status: cus?.status,
      goto: cus?.goto,
   });

   const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.checked });
   };
   const handleDeleteCustomer = async (id) => {
      const userConfirmed = window.confirm("Are you sure to delete this customer?");

      if (userConfirmed) {
         dispatch(deleteCustomer(id));
         const url = `${apiUrl}/api/deleteCustomer`;
         try {
            const response = await fetch(url, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ id: id }),
            });
            const data = await response.json();
           alert(data.message);
         } catch (error) {
            console.log('Error deleting customer:', error);
         }
      }
   };

   return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { background: '#f2f2f2' } }}>
         <TableCell>
            <IOSSwitch sx={{ marginTop: 2 }} name="status" checked={state.status} onChange={handleChange} />
            <Typography component="span" display="block" mt="5px">
               {cus?.id}
            </Typography>
         </TableCell>
         <TableCell>{cus?.first_name}</TableCell>
         <TableCell>{cus?.last_name}</TableCell>
         <TableCell>{cus?.email}</TableCell>
         <TableCell>{cus?.phone}</TableCell>
         <TableCell>{cus?.city}</TableCell>
         <TableCell>
            <Stack>
               <Stack direction="row" spacing={1} alignItems="center">
                  <div>sub.domain.com/{cus?.id}</div>
                  <CopyAllIcon sx={{ cursor: 'pointer' }} />
                  <Link href="/dashboard/customer-cart">
                     <Button variant="contained" color="secondary" sx={{ minWidth: 10, padding: '8px', marginLeft: 'auto' }}>
                        <ShoppingCartIcon />
                     </Button>
                  </Link>

                  <Link href={{
                     pathname: `/dashboard/create-customer`,
                     query: { id: cus?.id },
                  }}>
                     <Button variant="contained" color="warning" sx={{ minWidth: 10, padding: '8px' }}>
                        <BorderColorIcon />
                     </Button>
                  </Link>
                  <Button
                     variant="contained"
                     color="error"
                     sx={{ minWidth: 10, padding: '8px' }}
                     onClick={() => handleDeleteCustomer(cus?.id)}
                  >
                     <DeleteIcon />
                  </Button>
               </Stack>
               <Typography component="span" fontSize={12}>
                  URL should go to
               </Typography>
               <Stack direction="row" spacing={1}>
                  <CustomSelect disableUnderline variant="standard" value="Home" sx={{ maxWidth: 170, flex: 1 }}>
                     <CustomMenuItem value="Home">Home</CustomMenuItem>
                  </CustomSelect>
                  <IOSSwitch name="goto" checked={state.goto} onChange={handleChange} />
               </Stack>
            </Stack>
         </TableCell>
      </TableRow>
   );
}
