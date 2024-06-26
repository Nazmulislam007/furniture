import { apiUrl } from "./constant";

export const getCategory = async () => {
  const category = `${apiUrl}/api/getcategories`;
  const resp = await fetch(category);
  const result = await resp.json();
  return result.category;
};
export const addNewCustomer = async (formValues) => {
  console.log("formValues", formValues);
  const apiUrlEndpoint = `${apiUrl}/api/addcustomer`;
  const response = await fetch(apiUrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formValues)
  });
  const res = await response.json();
  return res;
};
export const insertMyPrice = async (obj) => {
  const category = await getCategory();
  let category_id = "";
  if (category) {
    category.map((elem) => {
      if (elem.url === obj.type) {
        category_id = elem.id;
      }
      return elem;
    });
  }
  obj.category_id = category_id;
  const apiUrlEndpoint = `${apiUrl}/api/addmyprice`;
  const response = await fetch(apiUrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  return response;
};
export const getMyPrice = async (obj) => {
  if (obj.CUSTOMER_ID) {
    const category = await getCategory();
    let category_id = "";
    if (category) {
      category.map((elem) => {
        if (elem.url === obj.selected) {
          category_id = elem.id;
        }
        return elem;
      });
    }
    obj.category_id = category_id;
    const getmyprice = `${apiUrl}/api/getmyprice`;
    const response = await fetch(getmyprice, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const resultMyprice = await response.json();
    if (obj.category_id) {
      return resultMyprice.response[0];
    }
    return resultMyprice.response;
  }
};
export const getCartBytype = async (obj) => {
  if (obj.CUSTOMER_ID) {
    const category = await getCategory();
    let category_id = "";
    if (category) {
      category.map((elem) => {
        if (elem.url === obj.selected) {
          category_id = elem.id;
        }
        return elem;
      });
    }
    obj.category_id = category_id;
    const cart = `${apiUrl}/api/getcartbytype`;
    const response = await fetch(cart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const result = await response.json();
    return result.data;
  }
};
export const getProductByCategory = async () => {
  const apiUrlEndpoint = `${apiUrl}/api/getProductByCategory`;
  const response = await fetch(apiUrlEndpoint);
  const result = await response.json();
  return result.products;
};
export const getCartByCustomer = async (obj) => {
  if (obj.CUSTOMER_ID) {
    const cartSql = `${apiUrl}/api/getcartbycustomer`;
    const response = await fetch(cartSql, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ customerId: obj.CUSTOMER_ID })
    });
    const result = await response.json();
    return result.data;
  }
};
export const getServiceCost = async (obj) => {
  const category = await getCategory();
  let category_id = "";
  if (category) {
    category.map((elem) => {
      if (elem.url === obj.selected) {
        category_id = elem.id;
      }
      return elem;
    });
  }
  obj.category_id = category_id;
  const cartSql = `${apiUrl}/api/getservicecost`;
  const response = await fetch(cartSql, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  const result = await response.json();
  return result.data;
};
export const getCustomeLineItems = async (obj) => {
  const category = await getCategory();
  let category_id = "";
  if (category) {
    category.map((elem) => {
      if (elem.url === obj.selected) {
        category_id = elem.id;
      }
      return elem;
    });
  }
  obj.category_id = category_id;
  const cartSql = `${apiUrl}/api/getcustomelineitems`;
  const response = await fetch(cartSql, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  const result = await response.json();
  return result.data;
};
export const getCustomeDiscount = async (obj) => {
  const cartSql = `${apiUrl}/api/getcustomediscount`;
  const response = await fetch(cartSql, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  const result = await response.json();
  return result.data;
};
export const removeLineItem = async (obj) => {
  const sql = `${apiUrl}/api/removeLineItem`;
  const response = await fetch(sql, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  const result = await response.json();
  return result.products;
};
export const logoutHandle = () => {
  sessionStorage.removeItem("user");
  return true;
};
export const addNewLineItem = async (obj) => {
  obj.value = obj?.price ? obj?.price : obj?.value;
  const apiUrlEndpoint = `${apiUrl}/api/addCustomLine`;
  const response = await fetch(apiUrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  return response;
};
export const updateCartQty = async (obj) => {
  const apiUrlEndpoint = `${apiUrl}/api/updateCartQty`;
  const response = await fetch(apiUrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  return response;
};
export const getCustomerByContractor = async (contractorId) => {
  const apiUrlEndpoint = `${apiUrl}/api/getcustomer`;
  const response = await fetch(apiUrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ contractorId })
  });
  const res = await response.json();
  return res.customer;
};
export const getCustomerbyId = async (custId) => {
  const apiUrlEndpoint = `${apiUrl}/api/getCustomerById?customerId=${custId}`;
  const response = await fetch(apiUrlEndpoint);
  const res = await response.json();
  return res.customer;
};

// cabinets
export const getCabinets = async () => {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/getCabinets`;
  const response = await fetch(apiUrlEndpoint);
  const res = await response.json();
  return res.products;
};
export const getDrawersFromDb = async (drawer_id) => {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/getDrawers?drawer_id=${drawer_id}`;
  const response = await fetch(apiUrlEndpoint);
  const res = await response.json();
  return res.drawer;
};

export async function getCorners(corner_id) {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/getCorners?corner_id=${corner_id}`;
  const response = await fetch(apiUrlEndpoint);
  const res = await response.json();
  return res.corner;
}
export async function getHandlesfromDB() {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/getHandles`;
  const response = await fetch(apiUrlEndpoint);
  const res = await response.json();
  return res.handles;
}
export async function cabinetsCart(products, category_id) {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/addCabinetsToCart`;
  const response = await fetch(apiUrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ products, category_id })
  });
  const res = await response.json();
  return res;
}
export async function getCabinetsCartDb(customer_id, product_id, drawer_id, corner_id) {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/getCabinetsCart?customerId=${customer_id}&product_id=${product_id}&drawer_id=${drawer_id}&corner_id=${corner_id}`;
  const response = await fetch(apiUrlEndpoint);
  const res = await response.json();
  return res.cabinets;
}
export async function incrementCabinteQty(
  customer_id,
  product_id,
  quantity,
  price,
  action,
  subtotal,
  category_id
) {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/increCabinetsQty`;
  const response = await fetch(apiUrlEndpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      customer_id,
      product_id,
      price,
      quantity,
      action,
      subtotal,
      category_id
    })
  });
  const res = await response.json();
  return res;
}
export async function deleteAllCabinetsFromCart(customer_id, ids) {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/deleteAllCabinets`;
  const response = await fetch(apiUrlEndpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ customer_id, ids })
  });
  const res = await response.json();
  return res;
}
export async function getHanldesFromCart() {
  const apiUrlEndpoint = `${apiUrl}/api/cabinets/getHanldesFromCart`;
  const response = await fetch(apiUrlEndpoint);
  const res = await response.json();
  return res.handles;
}
