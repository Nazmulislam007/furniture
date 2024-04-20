import { updateMyprice } from '../utility';
import {
   ADD_TO_CART,
   FILTER_BY_LOCATION_VENDOR,
   FILTER_BY_PRICE,
   REMOVE_TO_CART,
   SELECT_PRODUCT,
   // eslint-disable-next-line prettier/prettier
   SORTED_BY
} from './actionTypes';

function isAllorNot(name, value, state) {
   if (name === 'All' && value === 'All') return [];
   if (value === 'All') {
      return [...state.storeFilterOptions.filter((option) => Object.keys(option)[0] !== name)];
   }
   return [...state.storeFilterOptions.filter((option) => Object.keys(option)[0] !== name), { [name]: value }];
}

export const reducer = (state, { type, payload }) => {
   switch (type) {
      case SELECT_PRODUCT: {
         return {
            ...state,
            selectedProduct: payload,
         };
      }

      case FILTER_BY_LOCATION_VENDOR: {
         return {
            ...state,
            filterValue: payload,
         };
      }

      case SORTED_BY: {
         return {
            ...state,
            sortedBy: payload,
         };
      }

      case FILTER_BY_PRICE: {
         const { name, value } = payload;

         return {
            ...state,
            filterByPrice: {
               ...state.filterByPrice,
               [name]: value,
            },
         };
      }

      case 'STORE_FILTER_OPTIONS': {
         const { name, value } = payload;

         return {
            ...state,
            storeFilterOptions: isAllorNot(name, value, state),
         };
      }

      case ADD_TO_CART: {
         return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  product: {
                     ...state.addtoCart[payload.customerId].product,
                     [payload.type]: [...state.addtoCart[payload.customerId].product[payload.type], payload],
                  },
               },
            },
         };
      }

      case REMOVE_TO_CART: {
         return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  product: {
                     ...state.addtoCart[payload.customerId].product,
                     [payload.type]: state.addtoCart[payload.customerId].product[payload.type].filter(
                        (prod) => prod.id !== payload.id
                     ),
                  },
               },
            },
         };
      }

      case 'ADD_LINE_ITEM': {
         return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  customLineItem: {
                     ...state.addtoCart[payload.customerId].customLineItem,
                     [payload.type]: [
                        ...state.addtoCart[payload.customerId].customLineItem[payload.type],
                        { price: payload.price, id: payload.id },
                     ],
                  },
               },
            },
         };
      }
      case 'REMOVE_LINE_ITEM': {
         return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  customLineItem: {
                     ...state.addtoCart[payload.customerId].customLineItem,
                     [payload.type]: [
                        ...state.addtoCart[payload.customerId].customLineItem[payload.type].filter(
                           (item) => item.id !== payload.id
                        ),
                     ],
                  },
               },
            },
         };
      }

      case 'ADD_DISCOUNT_LINE_ITEM': {
         return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  customDiscountItem: [
                     ...state.addtoCart[payload.customerId].customDiscountItem,
                     { id: payload.id, price: payload.price },
                  ],
               },
            },
         };
      }

      case 'REMOVE_DISCOUNT_LINE_ITEM': {
         return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  customDiscountItem: [
                     ...state.addtoCart[payload.customerId].customDiscountItem.filter((item) => item.id !== payload.id),
                  ],
               },
            },
         };
      }

      case 'SET_MY_PRICE': {
         // updateMyprice(state, { type, payload });
         /* return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  myPrice: {
                     ...state.addtoCart[payload.customerId].myPrice,
                     [payload.type]: { price: payload.price, sign: payload.sign },
                  },
               },
            },
         }; */
      }

      case 'SET_MY_PRICE_ADD_TO_CART': {
         return {
            ...state,
            addtoCart: {
               ...state.addtoCart,
               [payload.customerId]: {
                  ...state.addtoCart[payload.customerId],
                  product: {
                     ...state.addtoCart[payload.customerId].product,
                     [payload.type]: state.addtoCart[payload.customerId].product[payload.type]?.map((item) => ({
                        ...item,
                        myPrice: payload.sign === '%' ? ((item.price / 100) * payload.price).toFixed(2) : payload.price,
                     })),
                  },
               },
            },
         };
      }

      default:
         return state;
   }
};
