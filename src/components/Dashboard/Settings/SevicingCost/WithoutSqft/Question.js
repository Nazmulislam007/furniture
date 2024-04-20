import { InputLabel, ListItem } from '@mui/material';

export default function Question({ children, quesitionName }) {
   return (
      <ListItem sx={{ padding: '30px 10px', display: 'flex', gap: 2, flexDirection: 'column', borderBottom: '1px solid' }}>
         <InputLabel fontWeight="500">How much do you charge to {quesitionName}</InputLabel>
         {children}
      </ListItem>
   );
}
