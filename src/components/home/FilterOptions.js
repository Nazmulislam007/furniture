import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { useEffect, useState } from 'react';
import SelectDropDown from '../SelectDropDown';

export default function FilterOptions({ filterItems, item }) {
   const { dispatch, storeFilterOptions } = useSeletedProduct();
   // reface state when rerender...
   const existingFilterItem = storeFilterOptions?.find((option) => Object.keys(option)[0] === item);
   const [selectItem, setSelectItem] = useState('');

   useEffect(() => {
      setSelectItem(existingFilterItem ? Object.values(existingFilterItem)[0] : 'All');
   }, [existingFilterItem]);

   useEffect(() => {
      dispatch({
         type: 'STORE_FILTER_OPTIONS',
         payload: { name: 'All', value: 'All' },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [filterItems]);

   const handleChange = (e) => {
      setSelectItem(e.target.value);
      dispatch({
         type: 'STORE_FILTER_OPTIONS',
         payload: e.target,
      });
   };

   return (
      <SelectDropDown
         menuItems={filterItems[item]}
         label={item}
         initialVal="All"
         name={item}
         value={selectItem}
         onChange={handleChange}
      />
   );
}
