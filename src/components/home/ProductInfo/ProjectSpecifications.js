import {
   Box,
   styled,
   Table,
   TableBody,
   TableCell,
   tableCellClasses,
   TableContainer,
   TableRow,
   // eslint-disable-next-line prettier/prettier
   Typography
} from '@mui/material';

const StyledTableCell = styled(TableCell)(() => ({
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

export default function ProjectSpecifications({ specification }) {
   const speci = (specification && Object.entries(JSON.parse(specification))) || [];
   return (
      <Box>
         <Typography variant="h4" sx={{ fontSize: 25, marginBottom: 2, marginTop: 3 }}>
            Product Specifications
         </Typography>
         <TableContainer>
            <Table sx={{ maxWidth: 400 }}>
               <TableBody>
                  {speci.map((row, i) => (
                     <TableRow key={i}>
                        <StyledTableCell component="th" scope="row" sx={{ border: '1px solid black', width: '45%' }}>
                           {row[0]}
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ border: '1px solid black', width: '45%' }}>
                           {row[1]}
                        </StyledTableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
}
