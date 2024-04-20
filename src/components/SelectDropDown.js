import { CustomMenuItem, CustomSelect } from '@/assets/Custom/selectiStyle';
import { InputLabel, Stack } from '@mui/material';

export default function SelectDropDown({ menuItems, label, initialVal, ...rest }) {
   return (
      <Stack>
         <InputLabel>{label}</InputLabel>
         <CustomSelect disableUnderline variant="standard" sx={{ padding: '2px 8px', width: '100%' }} {...rest}>
            {initialVal && <CustomMenuItem value={initialVal}>{initialVal}</CustomMenuItem>}
            {menuItems?.map((val, i) => (
               <CustomMenuItem value={val} key={i}>
                  {val}
               </CustomMenuItem>
            ))}
         </CustomSelect>
      </Stack>
   );
}
