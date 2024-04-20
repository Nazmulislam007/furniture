import { updateCartQty } from '@/Context/utility';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function ProductCost({ info, setNewPrice,newPrice, location }) {
   const { id, type, color, customerSqft, img, price, myprice, totalCase,  totalPrice } = info;
   const [qty, setQty] = useState(info.quantity);
   const changeQty = (e, id) => {
      const name = e.target.name;
      const quantity = e.target.value;
      setQty(quantity);
      updateCartQty({ name: name, quantity: quantity, id: id, total: quantity * price });
      const newData = newPrice.map(item => {
         if (item.id === id) {
            item.total = quantity * price
            item.quantity = quantity;
         }
         return item;
      });
      setNewPrice(newData)
   }
   return (
      <Box
         sx={{
            paddingBlock: 2,
            borderBottom: '2px solid gray',
         }}
      >
         <Box
            sx={{
               display: 'flex',
               gap: { lg: '40px', xs: '20px' },
               flexWrap: 'wrap',
               fontWeight: 500,
               justifyContent: 'space-between',
            }}
         >
            <Stack direction="row" gap="15px">
               <Image src={img} height={100} width={100} sizes="10vw" alt="img" priority />
               <Stack>
                  <Box>{type}</Box>
                  <Box>{color}</Box>
               </Stack>
            </Stack>
            {info['sqft/case'] && (
               <Stack>
                  <Box>{info['sqft/case']} sqft/case</Box>
                  <Box>$ {price} /case</Box>
                  <Box>= $ {Math.ceil(price / info['sqft/case'])} /sqft</Box>
               </Stack>
            )}
            <Stack>
               <Box>My set price</Box>
               <Box>${price}</Box>
               {/* <Box>${myprice}</Box> */}
            </Stack>
            {!info['sqft/case'] && (
               <Stack>
                  <Box>Quantity</Box>
                  <Box>
                     <input type='text' onChange={(e) => changeQty(e, id)} name='' value={qty} />
                     <CloseIcon />
                  </Box>
               </Stack>
            )}
            {customerSqft && (
               <Stack>
                  <Box>Square feet</Box>
                  <Box>
                     <span>{customerSqft}</span>
                     <Box fontSize={13} color="blue">
                        {Math.ceil(totalCase)} cases needed
                     </Box>
                  </Box>
               </Stack>
            )}
            <Stack>
               <Box>Price</Box>
               <Box>${qty * price}</Box>
            </Stack>
         </Box>
         {location && (
            <>
               <Stack direction="row" fontSize={13} fontWeight="400" mt="5px">
                  <b>Store Address:</b>&#160;240 Main Street, Toronto, ON M3M 2D3
               </Stack>
               <Stack direction="row" fontSize={13} fontWeight="400" mt="3px">
                  <b>SKU: </b>&#160;32989 - Item added 12 Jan 2023
               </Stack>
            </>
         )}
      </Box>
   );
}
