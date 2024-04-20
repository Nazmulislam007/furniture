import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import classes from './ProductDesciption.module.css';
import ProjectSpecifications from './ProjectSpecifications';

export default function ProductDescription() {
   const { selectedProduct } = useSeletedProduct() || {};
   const [seeMore, setSeeMore] = useState(false);

   let des;
   const description = selectedProduct?.description && JSON.parse(selectedProduct?.description);
   if (!seeMore) des = description && description.slice(0, 3);
   if (seeMore) des = description;

   return (
      <Box sx={{ padding: '25px', border: '1px solid black', backgroundColor: 'white', flexBasis: { lg: '65%', xs: '100%' } }}>
         <Typography variant="h4" sx={{ fontSize: 25 }}>
            Product Description
         </Typography>
         <ul className={classes.listItems}>
            {(des) && des?.map((des, i) => (
               <li key={i}>{des}</li>
            ))}
         </ul>
         <button onClick={() => setSeeMore(!seeMore)} className={classes.seeMore}>
            {!seeMore ? 'see more' : 'see less'}
         </button>

         <ProjectSpecifications specification={selectedProduct?.specification} />
      </Box>
   );
}
