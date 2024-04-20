import { Input, InputLabel, Typography } from '@mui/material';

export default function TextInput({ label, error, ...rest }) {
   return (
      <div>
         <InputLabel>{label}</InputLabel>
         <Input
            disableUnderline
            sx={{
               border: '1px solid',
               padding: '2px 8px',
               width: '100%',
            }}
            autoComplete="off"
            {...rest}
         />
         {error && (
            <Typography component="span" fontSize={13} color="red">
               {error}
            </Typography>
         )}
      </div>
   );
}
