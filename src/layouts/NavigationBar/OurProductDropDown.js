import { apiUrl } from '@/Context/constant';
import { LinkButton } from '@/assets/Custom/buttonStyle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MenuItem, MenuList } from '@mui/material';
import { Stack } from '@mui/system';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* const productCatagory = [
   { name: 'Flooring', path: '/flooring' },
   { name: 'Tiles', path: '/tiles' },
   { name: 'CounterTop', path: '/countertop' },
   { name: 'Vanities', path: '/vanities' },
   { name: 'Kitchen Faucets', path: '/kitchenFaucets' },
   { name: 'Bathroom Faucets', path: '/bathroomFaucets' },
   { name: 'Cabinets', path: '/cabinets' },
]; */

export default function OurProductDropDown() {
   const [productCatagory, setProductCatagory] = useState([]);
   useEffect(() => {
      async function getPageData() {
         const apiUrlEndpoint = `${apiUrl}/api/getcategories`;
         const response = await fetch(apiUrlEndpoint);
         const res = await response.json();
         setProductCatagory(res.category);
      }
      getPageData();
   }, []);
   return (
      <Stack
         sx={{
            color: 'black',
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
         }}
         className="dropdown"
      >
         <LinkButton variant="text" endIcon={<ArrowDropDownIcon />} sx={{ color: 'black' }}>
            Our product
         </LinkButton>
         <MenuList
            sx={{ position: 'absolute', bgcolor: 'white', zIndex: 10, top: '100%', display: 'none' }}
            className="dropdown-menu"
         >
            {productCatagory.map((page, i) => (
               <Link key={i} href={page.url}>
                  <MenuItem>{page.page_name}</MenuItem>
               </Link>
            ))}
         </MenuList>
      </Stack>
   );
}
