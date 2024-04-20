import { Box, Stack, Typography } from '@mui/material';

export default function CustomerActivity() {
   return (
      <Stack sx={{ flex: 1, bgcolor: 'white', padding: { md: '40px 35px', xs: '30px 20px', height: 'fit-content' } }}>
         <Typography variant="h3" fontSize={25} mb={3}>
            Customer Activity
         </Typography>
         <Stack spacing={5}>
            <Stack direction="row" spacing={1} alignItems="start">
               <Box sx={{ width: 20, height: 20, bgcolor: '#1565c0', borderRadius: '50%', marginTop: '3px' }} />
               <Stack>
                  <Typography component="p" fontSize={20}>
                     Customer was created
                  </Typography>
                  <Box component="span">29 june 2022</Box>
               </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="start" position="relative">
               <Box
                  sx={{
                     width: 20,
                     height: 20,
                     bgcolor: '#1565c0',
                     borderRadius: '50%',
                     marginTop: '3px',
                  }}
               />
               <Box
                  sx={{
                     position: 'absolute',
                     width: '2px',
                     height: '90px',
                     bgcolor: '#1565c0',
                     bottom: '90%',
                     left: '1px',
                  }}
               />
               <Stack>
                  <Typography component="p" fontSize={20}>
                     Clicked on customer link
                  </Typography>
                  <Box component="span">29 june 2022</Box>
               </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="start" position="relative">
               <Box sx={{ width: 20, height: 20, bgcolor: '#1565c0', borderRadius: '50%', marginTop: '3px' }} />
               <Box
                  sx={{
                     position: 'absolute',
                     width: '2px',
                     height: '90px',
                     bgcolor: '#1565c0',
                     bottom: '90%',
                     left: '1px',
                  }}
               />
               <Stack>
                  <Typography component="p" fontSize={20}>
                     Items added to cart
                  </Typography>
                  <Box component="span">29 june 2022</Box>
               </Stack>
            </Stack>
         </Stack>
      </Stack>
   );
}
