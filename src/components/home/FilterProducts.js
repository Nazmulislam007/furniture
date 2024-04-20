import TextInput from '@/components/TextInput';
import { filterOptions } from '@/constant/filterOptions';
import { filterByPriceFn, sortedByFn } from '@/Context/ProductInfoProvider/actions';
import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import useDebouce from '@/lib/hook/useDebouce';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import SelectDropDown from '../SelectDropDown';
import FilterOptions from './FilterOptions';

export default function FilterProducts({ pathname }) {
   const debounce = useDebouce();
   const { sortedBy, dispatch } = useSeletedProduct();

   // according to the page, filter item will change.
   const filterItems = filterOptions[pathname];

   const handleSortChange = (e) => {
      dispatch(sortedByFn(e.target.value));
   };

   const handlePriceChange = debounce((text) => {
      dispatch(filterByPriceFn(text));
   });

   return (
      <Box
         sx={{
            position: 'absolute',
            marginTop: '5px',
            maxWidth: 400,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
            bgcolor: 'white',
            padding: '25px',
            boxShadow: '0px 0px 1px 0px black',
            zIndex: 10,
         }}
      >
         {Object.keys(filterItems)?.map((item, i) => (
            <FilterOptions item={item} filterItems={filterItems} key={i} />
         ))}

         <Stack direction="row" spacing={1} alignItems="center" gridRow="3 / 4">
            <TextInput label="Min price" name="min" onChange={(e) => handlePriceChange(e.target)} />
            <span style={{ marginBottom: '-20px' }}>-</span>
            <TextInput label="Max price" name="max" onChange={(e) => handlePriceChange(e.target)} />
         </Stack>

         <SelectDropDown
            menuItems={['Posted: oldest first', 'Posted: lowest first', 'Posted: highest first']}
            label="Sort Product"
            initialVal={sortedBy}
            name="sort"
            value={sortedBy}
            onChange={handleSortChange}
         />
      </Box>
   );
}
