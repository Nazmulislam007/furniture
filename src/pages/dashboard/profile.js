import { CustomMenuItem, CustomSelect } from '@/assets/Custom/selectiStyle';
import TextInput from '@/components/TextInput';
import { Box, Button, InputLabel, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const cities = ['Acton'];

export default function Profile() {
   const [profileData, setProfileData] = useState({});
   useState(()=>{
      const userData = typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem('user')) : null;
      setProfileData(userData);
   },[]);
   return (
      <Box maxWidth="md" marginX="auto" px={1} mb={5} mt={2}>
         <Stack direction="row" sx={{ display: 'flex', gap: 2, flexWrap: { md: 'nowrap', xs: 'wrap' } }}>
            <Box sx={{ padding: 4, bgcolor: 'white', flexBasis: '100%' }}>
               <Typography variant="body1" fontSize={25} fontWeight={600} mb={2}>
                  My Profile
               </Typography>
               <Stack
                  sx={{
                     display: 'grid',
                     gridTemplateColumns: { sm: 'repeat(2, 1fr)' },
                     gap: 2,
                     paddingBottom: 4,
                     flexBasis: '100%',
                  }}
               >
                  <TextInput label="First Name" value={profileData?.first_name} />
                  <TextInput label="Last name" value={profileData?.last_name} />
                  <TextInput label="Address" value="" />
                  <TextInput label="Postal code" value="" />
                  <Stack>
                     <InputLabel>City</InputLabel>
                     <CustomSelect
                        disableUnderline
                        variant="standard"
                        value={cities[0]}
                        sx={{ padding: '2px 8px', width: '100%' }}
                     >
                        {cities.map((val, i) => (
                           <CustomMenuItem value={val} key={i}>
                              {val}
                           </CustomMenuItem>
                        ))}
                     </CustomSelect>
                  </Stack>
                  <Stack>
                     <InputLabel>Interested Category</InputLabel>
                     <CustomSelect
                        disableUnderline
                        variant="standard"
                        value={['Other']}
                        sx={{ padding: '2px 8px', width: '100%' }}
                     >
                        {['Other'].map((val, i) => (
                           <CustomMenuItem value={val} key={i}>
                              {val}
                           </CustomMenuItem>
                        ))}
                     </CustomSelect>
                  </Stack>
               </Stack>
            </Box>
            <Box sx={{ padding: 4, bgcolor: 'white', flexBasis: '100%' }}>
               <Typography variant="body1" fontSize={25} fontWeight={600} mb={2}>
                  My Business
               </Typography>
               <Stack
                  sx={{
                     display: 'grid',
                     gridTemplateColumns: { sm: 'repeat(2, 1fr)' },
                     gap: 2,
                     paddingBottom: 4,
                     flexBasis: '100%',
                  }}
               >
                  <TextInput label="My Business Name" />
                  <TextInput label="Last name" />
                  <TextInput label="Address" />
                  <TextInput label="Postal code" />
               </Stack>
            </Box>
         </Stack>
         <Button variant="contained" sx={{ marginTop: 2 }}>
            Save
         </Button>
      </Box>
   );
}
