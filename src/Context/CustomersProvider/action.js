const {
	CREATE_CUSTOMER,
	DELETE_CUSTOMER,
	ADD_SERVICE,
	SELECT_CUSTOMER,
} = require("./actionType");

const createCustomer = (obj) => ({
	type: CREATE_CUSTOMER,
	payload: obj,
});
const getCustomer = (obj) => ({
	type: GET_CUSTOMER,
	payload: obj,
});

const deleteCustomer = (id) => ({
	type: DELETE_CUSTOMER,
	payload: id,
});

const addServicefn = (obj) => ({
	type: ADD_SERVICE,
	payload: obj,
});

const selectCustomerFn = (id) => ({
	type: SELECT_CUSTOMER,
	payload: id,
});

export { createCustomer, deleteCustomer, addServicefn, selectCustomerFn };
//
