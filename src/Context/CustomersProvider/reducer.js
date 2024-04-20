import { CREATE_CUSTOMER, DELETE_CUSTOMER, SELECT_CUSTOMER, GET_CUSTOMER } from './actionType';

const reducer = (state, { type, payload }) => {
   switch (type) {
      case GET_CUSTOMER: {
         return {
            ...state,
            customers: payload, 
         };
      }
      case CREATE_CUSTOMER: {
         return {
            ...state,
            customers: [...state.customers, payload],
         };
      }
      case DELETE_CUSTOMER: {
         return {
            ...state,
            customers: state.customers?.filter((customer) => customer.id !== payload),
         };
      }

      case SELECT_CUSTOMER: {
         return {
            ...state,
            selectedCustomer: payload,
         };
      }

      default:
         return state;
   }
};

export default reducer;
