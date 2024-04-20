import { MenuItem, Select, styled } from '@mui/material';

const CustomSelect = styled(Select)(() => ({
   border: '1px solid',
   padding: '0px 5px',
   '& .MuiSelect-select:focus': {
      background: 'transparent',
   },
}));

const CustomMenuItem = styled(MenuItem)(() => ({
   '&.MuiMenuItem-root.Mui-selected': {
      backgroundColor: 'transparent',
   },
}));

export { CustomSelect, CustomMenuItem };

//
