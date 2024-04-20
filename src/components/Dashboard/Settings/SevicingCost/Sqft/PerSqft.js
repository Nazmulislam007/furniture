import { useGlobalState } from '@/Context/GlobalStateProvider/GlobalStateProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Input, Stack } from '@mui/material';
import { useState } from 'react';

export default function PerSqft({ sqft, questionId }) {
   const { dispatch } = useGlobalState();

   const [charge, setCharge] = useState({
      totalSqft: sqft.totalSqft,
      perSqft: sqft.perSqft,
   });

   const handleChange = (e) => {
      setCharge({
         ...charge,
         [e.target.name]: e.target.value,
      });

      dispatch({
         type: 'HANDLE_CHANGE_INCREMENT_VALUE',
         payload: {
            id: sqft.id,
            questionId,
            ...charge,
            [e.target.name]: e.target.value,
         },
      });
   };

   const handleDeleteSqft = () => {
      dispatch({
         type: 'DELETE_SQFT',
         payload: { id: sqft.id, questionId },
      });
   };

   return (
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} position="relative">
         <DeleteIcon
            sx={{ position: 'absolute', right: 10, top: 10, color: '#e91e63', fontSize: 22, cursor: 'pointer' }}
            onClick={handleDeleteSqft}
         />
         <Stack>
            <Box fontWeight={500} fontSize={13} width="80px" lineHeight="15px" mb="2px">
               For sq. ft at or above
            </Box>
            <Stack direction="row" gap={1} alignItems="center">
               <Input
                  name="totalSqft"
                  value={charge.totalSqft}
                  onChange={handleChange}
                  disableUnderline
                  sx={{ border: '1px solid', padding: '4px 0 4px 15px', width: 80 }}
               />
               <Box fontWeight={500}>charge</Box>
            </Stack>
         </Stack>
         <Stack>
            <Box fontWeight={500} fontSize={13} width="90px" lineHeight="15px" mb="2px">
               Price per Square foot
            </Box>
            <Stack direction="row" gap={1} alignItems="center" position="relative">
               <Box sx={{ position: 'absolute', left: 8 }}>$</Box>
               <Input
                  name="perSqft"
                  value={`${charge.perSqft}`}
                  onChange={handleChange}
                  disableUnderline
                  sx={{ border: '1px solid', padding: '4px 0 4px 20px', width: 80 }}
               />
               <Box fontWeight={500}>per square foot</Box>
            </Stack>
         </Stack>
      </Stack>
   );
}
