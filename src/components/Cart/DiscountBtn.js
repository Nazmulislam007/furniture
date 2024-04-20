/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { removeLineItem } from '@/Context/utility';
import { Box, Stack } from '@mui/material';

export default function DiscountBtn({ remove, name, price, id, customerId, type, lineItem }) {
   const { dispatch } = useSeletedProduct();

   // console.log("lineItem", lineItem);
   const handleDelete = async () => {
      if (name === '*Custom Line Item*') {
         const response = await removeLineItem({id:id});
         if (response) {
            console.log("response", response);
            alert('Custom Line item removed.')
         }
      }

      /* return dispatch({
         type: 'REMOVE_DISCOUNT_LINE_ITEM',
         payload: {
            id,
            customerId,
         },
      }); */
   };

   return (
      <Stack direction="row" justifyContent="space-between">
         <div>
            <Box
               sx={{
                  border: '1px solid black',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: { sm: 17, xs: 15 },
               }}
            >
               {lineItem?.name}
            </Box>
            <button style={{ background: '#c1272d', color: '#fff', margin: '2px', padding: '5px', borderRadius: '5px', cursor: 'pointer' }} onClick={handleDelete}>
               {/* {remove} */}
               Remove
            </button>
            
         </div>
         <Box
            sx={{
               justifySelf: 'flex-end',
               border: '1px solid black',
               padding: '5px 10px',
               color: '#c1272d',
               height: 'fit-content',
            }}
         >
            ${lineItem?.price}
         </Box>
      </Stack>
   );
}
