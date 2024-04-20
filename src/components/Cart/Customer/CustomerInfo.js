import { Stack, Typography } from '@mui/material';

export default function CustomerInfo({ title, value }) {
   return (
      <Stack>
         <Typography component="p" fontSize={15} fontWeight={500}>
            {title}
         </Typography>
         <Typography component="div" fontSize={14}>
            {value}
         </Typography>
      </Stack>
   );
}
