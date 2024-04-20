const {
   SELECT_PRODUCT,
   ADD_NEW_PRODUCTS,
   REMOVE_NEW_PRODUCTS,
   FILTER_BY_LOCATION_VENDOR,
   SORTED_BY,
   FILTER_BY_PRICE,
   ADD_TO_CART,
   REMOVE_TO_CART,
} = require('./actionTypes');

const selectProduct = (select) => ({
   type: SELECT_PRODUCT,
   payload: select,
});

const addNewProductFn = (obj) => ({
   type: ADD_NEW_PRODUCTS,
   payload: obj,
});

const removeNewProductFn = (id) => ({
   type: REMOVE_NEW_PRODUCTS,
   payload: id,
});

const filterByVendorLocationFn = (obj) => ({
   type: FILTER_BY_LOCATION_VENDOR,
   payload: obj,
});

const sortedByFn = (value) => ({
   type: SORTED_BY,
   payload: value,
});

const filterByPriceFn = (obj) => ({
   type: FILTER_BY_PRICE,
   payload: obj,
});

const addToCartFn = (obj) => ({
   type: ADD_TO_CART,
   payload: obj,
});

const removeToCart = (obj) => ({
   type: REMOVE_TO_CART,
   payload: obj,
});

export {
   selectProduct,
   addNewProductFn,
   removeNewProductFn,
   filterByVendorLocationFn,
   sortedByFn,
   filterByPriceFn,
   addToCartFn,
   removeToCart,
};

//
