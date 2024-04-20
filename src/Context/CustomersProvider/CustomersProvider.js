import { createContext, useContext, useMemo, useReducer } from 'react';
import reducer from './reducer';

const CustomersContext = createContext();

export const useCustomers = () => useContext(CustomersContext);

export default function CustomersProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, {
      customers: [
         {
            id: 23,
            fname: 'Nazmul',
            lname: 'Islam',
            phone: 5414234,
            note: 'this is a note',
            city: 'acton',
            state: 'acton',
            email: 'nazmul@naz.com',
            address: 'ulipur',
            catagory: 'other',
            other: 'other',
            page: 'Home',
            goto: true,
            status: false,
         },
         {
            id: 24,
            fname: 'Tejas',
            lname: 'Patel',
            phone: 1234567,
            note: 'this is a note',
            city: 'acton',
            state: 'acton',
            email: 'nazmul@naz.com',
            address: 'ulipur',
            catagory: 'other',
            other: 'other',
            page: 'Home',
            goto: true,
            status: false,
         },
      ],
      selectedCustomer: 23,
   });

   const value = useMemo(() => ({ ...state, dispatch }), [state]);

   return <CustomersContext.Provider value={value}>{children}</CustomersContext.Provider>;
}
