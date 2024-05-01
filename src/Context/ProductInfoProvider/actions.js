const {
  SELECT_PRODUCT,
  ADD_NEW_PRODUCTS,
  REMOVE_NEW_PRODUCTS,
  FILTER_BY_LOCATION_VENDOR,
  SORTED_BY,
  FILTER_BY_PRICE,
  ADD_TO_CART,
  REMOVE_TO_CART,
  ADD_CABINETS_COLLECTION,
  INCREMENT_QANTITY,
  DECREMENT_QANTITY,
  ADD_DOOR_HANDLES,
  REMOVE_DOOR_HANDLES,
  ACTIVE_PRODUCT_STATUS,
  PASSIVE_PRODUCT_STATUS
} = require("./actionTypes");

const selectProduct = (select) => ({
  type: SELECT_PRODUCT,
  payload: select
});

const addNewProductFn = (obj) => ({
  type: ADD_NEW_PRODUCTS,
  payload: obj
});

const removeNewProductFn = (id) => ({
  type: REMOVE_NEW_PRODUCTS,
  payload: id
});

const filterByVendorLocationFn = (obj) => ({
  type: FILTER_BY_LOCATION_VENDOR,
  payload: obj
});

const sortedByFn = (value) => ({
  type: SORTED_BY,
  payload: value
});

const filterByPriceFn = (obj) => ({
  type: FILTER_BY_PRICE,
  payload: obj
});

const addToCartFn = (obj) => ({
  type: ADD_TO_CART,
  payload: obj
});

const removeToCart = (obj) => ({
  type: REMOVE_TO_CART,
  payload: obj
});

// cabinates collection and quantity
const addCabinetsCollectionFn = (arr) => ({
  type: ADD_CABINETS_COLLECTION,
  payload: arr
});

const increQtyFn = (id) => ({
  type: INCREMENT_QANTITY,
  payload: id
});

const decreQtyFn = (id) => ({
  type: DECREMENT_QANTITY,
  payload: id
});

const addDoorHandlesFn = (obj) => ({
  type: ADD_DOOR_HANDLES,
  payload: obj
});

const removeDoorHandlesFn = (id) => ({
  type: REMOVE_DOOR_HANDLES,
  payload: id
});

const activeProductStatusFn = (obj) => ({
  type: ACTIVE_PRODUCT_STATUS,
  payload: obj
});

const passiveProductStatusFn = (obj) => ({
  type: PASSIVE_PRODUCT_STATUS,
  payload: obj
});

export {
  activeProductStatusFn,
  addCabinetsCollectionFn,
  addDoorHandlesFn,
  addNewProductFn,
  addToCartFn,
  decreQtyFn,
  filterByPriceFn,
  filterByVendorLocationFn,
  increQtyFn,
  passiveProductStatusFn,
  removeDoorHandlesFn,
  removeNewProductFn,
  removeToCart,
  selectProduct,
  sortedByFn
};
