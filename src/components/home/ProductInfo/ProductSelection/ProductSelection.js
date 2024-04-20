import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PriceCalculation from './PriceCalculation';
import { apiUrl } from '@/Context/constant';

export default function ProductSelection({ pathname }) {
   const [userData, setUserData] = useState()
   const [category, setCategory] = useState({})
   const router = useRouter();
   const { selectedProduct } = useSeletedProduct() || {};
   const { img, name, price, category_id } = selectedProduct;
      const handleCategory = async (id) => {
      const apiUrlEndpoint = `${apiUrl}/api/getcategories`;
      const response = await fetch(apiUrlEndpoint, {
         method: 'POST', headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ id: id })
      });
      const res = await response.json();
      setCategory(res.category[0]);
   }

   useEffect(() => {
      handleCategory(category_id)
   }, [category_id])

   useEffect(() => {
      const user = typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem('user')) : null;
      setUserData(user)
   }, [])
   const CUSTOMER_ID = userData?.customer_id;

   return (
      <Box sx={{ padding: '25px', border: '1px solid black', backgroundColor: 'white', flex: 1 }}>
         <Typography variant="h4" sx={{ fontSize: 30 }}>
            Selection
         </Typography>
         <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
            <CardMedia
               component="img"
               sx={{ width: 100, height: 100 }}
               image={img}
               alt="Live from space album cover"
               loading="true"
            />
            <Box>
               <Typography component="div">{name}</Typography>
               <Typography variant="subtitle1" color="text.secondary" component="div">
                  - {category?.page_name}
               </Typography>
               <Typography variant="subtitle1" color="blue" component="div">
                  ${price}
                  {selectedProduct['sqft/case'] && '/sqft'}
               </Typography>
            </Box>
         </Box>
         <PriceCalculation name={pathname} />

         {(!userData) &&
            <Link href="/login">
               <Button
                  variant="button"
                  sx={{
                     background: 'gray',
                     color: 'white',
                     '&:hover': {
                        backgroundColor: 'gray',
                     },
                  }}
               >
                  Login
               </Button>{' '}
            </Link>}
      </Box>
   );
}
