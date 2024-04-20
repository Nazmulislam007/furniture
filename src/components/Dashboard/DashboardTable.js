import { useCustomers } from '@/Context/CustomersProvider/CustomersProvider';
import { getCustomerByContractor } from '@/Context/utility';
import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import DashboardTableRow from './DashboardTableRow';
import { GET_CUSTOMER } from '@/Context/CustomersProvider/actionType';

export default function DashboardTable() {
   const { customers, dispatch } = useCustomers() || {};
   const [customerData, setCustomerData] = useState([]);
   useEffect(() => {
      const contractorId = JSON.parse(sessionStorage.getItem('user'))?.id
      getCustomers(contractorId);
   }, []);
   const getCustomers = async (contractorId) => {
      const customers = await getCustomerByContractor(contractorId)
      if (customers) {
         setCustomerData(customers);
         dispatch({ type: GET_CUSTOMER, payload: customers });
      }
   }
   return (
      <>
         <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Status</TableCell>
                     <TableCell>F.Name</TableCell>
                     <TableCell>L.Name</TableCell>
                     <TableCell>Email</TableCell>
                     <TableCell>Phone</TableCell>
                     <TableCell>City</TableCell>
                     <TableCell>Unique Shop URL</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {customers.length < 0 ? <p>No customer found.</p> :
                     customers.map((cus) => (
                        <DashboardTableRow key={cus?.id} setCustomerData={setCustomerData} cus={cus} dispatch={dispatch}/>
                     ))
                  }
               </TableBody>
            </Table>
         </TableContainer>
         <Stack direction="row" my={3} justifyContent="flex-end">
            <Pagination count={4} size="medium" />
         </Stack>
      </>
   );
}
