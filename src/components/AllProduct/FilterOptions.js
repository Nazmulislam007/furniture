import { filterByVendorLocationFn } from '@/Context/ProductInfoProvider/actions';
import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import SelectDropDown from '../SelectDropDown';

export default function FilterOptions({ products }) {
   const { dispatch } = useSeletedProduct();

   const filterItems = (products) && products.map((cata) => ({
      location: cata.location,
      vendor: cata.vendor_id,
   }));

   const [select, setSelect] = useState({
      location: 'All area',
      vendor: 'All vendor',
   });

   // when change catagory, it should be render.
   useEffect(() => {
      setSelect({
         location: 'All area',
         vendor: 'All vendor',
      });
   }, [products]);

   // filter by vendor and location
   useEffect(() => {
      dispatch(filterByVendorLocationFn(select));
   }, [select, dispatch]);

   const handleChange = (e) => {
      setSelect({ ...select, [e.target.name]: e.target.value });
   };

   return (
      <Stack direction="row" gap="10px">
         <SelectDropDown
            menuItems={filterItems && filterItems.map((val) => val.location)}
            label="Filter by location"
            initialVal="All area"
            name="location"
            value={select.location}
            onChange={handleChange}
         />
         <SelectDropDown
            menuItems={filterItems && filterItems.map((val) => val.vendor_id)}
            label="Filter by Vendor"
            initialVal="All vendor"
            value={select.vendor}
            name="vendor"
            onChange={handleChange}
         />
      </Stack>
   );
}
