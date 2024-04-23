import { TAX_PERCENT } from "@/Context/constant";
import {
  addNewLineItem,
  getCartByCustomer,
  getCategory,
  getCustomeDiscount,
  getCustomeLineItems,
  getMyPrice,
  removeLineItem,
} from "@/Context/utility";
import DiscountBtn from "@/components/Cart/DiscountBtn";
import ProductCost from "@/components/Cart/ProductCost";
import ServiceCost from "@/components/Cart/ServiceCost";
import SubTotal from "@/components/Cart/SubTotal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// const CUSTOMER_ID = 23;
export default function MyCart({ customerId }) {
  const userData =
    typeof window !== "undefined"
      ? JSON.parse(window.sessionStorage.getItem("user"))
      : null;
  const CUSTOMER_ID = customerId ? customerId : userData?.customer_id;
  // const { addtoCart } = useSeletedProduct() || {};
  const [serviceTotalMyCart, setServiceTotalMyCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [myPrice, setMyPrice] = useState([]);
  const [newPrice, setNewPrice] = useState([]);
  const [customLineItem, setCustomLineItem] = useState([]);
  const [customDiscountItem, setCustomDiscountItem] = useState([]);
  const [lineItemsLayout, setLineItemsLayout] = useState([]);
  const [customObj, setCustomObj] = useState([]);
  const [totalProductAmount, setTotalProductAmount] = useState(0);
  useEffect(() => {
    if (CUSTOMER_ID) {
      getMyPriceData();
      getCustomLine();
      getAllCustomDiscount();
      setServiceTotalMyCart(0);
    }
  }, [CUSTOMER_ID]);

  const getAllCustomDiscount = async () => {
    if (CUSTOMER_ID) {
      const customeLineData = await getCustomeDiscount({
        customerId: CUSTOMER_ID,
      });
      setCustomDiscountItem(customeLineData);
    }
  };
  const getCustomLine = async () => {
    const category = await getCategory();
    const newArr = [];
    category.filter((x) => {
      return newArr.push({ id: x.id, category: x.url });
    });
    const customeLineData = await getCustomeLineItems({
      customerId: CUSTOMER_ID,
    });
    let cate = {};
    newArr.map((elem) => {
      cate[elem.category] = customeLineData?.filter(
        (z) => z.category_id === elem.id
      );
    });
    setCustomLineItem(cate);
  };
  const getMyPriceData = async () => {
    if (CUSTOMER_ID) {
      const mp_result = await getMyPrice({ CUSTOMER_ID });
      setMyPrice(mp_result);
      getAllCartBycustomer(mp_result);
    }
  };
  const getAllCartBycustomer = async (myPriceArr) => {
    const category = await getCategory();
    const newArr = [];
    category.filter((x) => {
      return newArr.push({ id: x.id, category: x.url });
    });
    if (CUSTOMER_ID) {
      let cartData = await getCartByCustomer({ CUSTOMER_ID });
      setNewPrice(cartData);
      cartData.map((ele) => {
        myPriceArr.find((x) => {
          if (x.category_id === ele.category_id) {
            if (x?.sign === "%") {
              return (ele.myprice =
                (parseFloat(ele?.price) / 100) * parseFloat(x?.price));
            } else {
              return (ele.myprice = parseFloat(x?.price));
            }
          }
        });
        return ele;
      });
      let cate = {};
      const newCat = [];
      newArr.map((elem) => {
        cate = [
          elem.category,
          cartData.filter((z) => z.category_id === elem.id),
        ];
        newCat.push(cate);
      });
      setCartItems(newCat);
    }
  };
  // sum of the total amount;

  useEffect(() => {
    if (Array.isArray(newPrice) && newPrice.length > 0) {
      const total = newPrice.reduce((sum, product) => sum + product.total, 0);
      setTotalProductAmount(total);
    }
  }, [newPrice, CUSTOMER_ID]);

  const totalCustomLine = Object.keys(customLineItem).reduce(
    (accumulator, currentKey) => {
      const items = customLineItem[currentKey];
      if (items && items.length > 0) {
        return accumulator + items.reduce((sum, item) => sum + +item.price, 0);
      }
      return accumulator;
    },
    0
  );

  const totalDiscountLine = customDiscountItem?.reduce(
    (prev, curr) => prev + +curr.price,
    0
  );
  const subTotal =
    +serviceTotalMyCart +
    +totalProductAmount +
    +totalCustomLine -
    +totalDiscountLine;
  const tax = (subTotal / 100) * TAX_PERCENT;
  const total = (subTotal / 100) * TAX_PERCENT + subTotal;

  const addCustomLineItem = (type) => {
    const newLineItemsLayout = [
      ...lineItemsLayout,
      `${type}_${lineItemsLayout.length + 1}`,
    ];
    setLineItemsLayout(newLineItemsLayout);
  };
  /* const onChangeHandler = (index, name, newValue, lineItem) => {
      if (lineItem) {
         const newCategory = customLineItem[index].map((category, i) => {
            if (category.id === lineItem.id) {
               return { ...category, [name]: newValue };
            }
            return category;
         });

         setCustomLineItem((prevDataArray) => {
            prevDataArray[index] = newCategory
            console.log("prevDataArray", prevDataArray);
            return prevDataArray;
         });
      } else {
         setCustomObj((prevDataArray) => {
            const updatedArray = [...prevDataArray];
            updatedArray[index] = { ...updatedArray[index], [name]: newValue };
            return updatedArray;
         });
      }
   } */
  const onChangeHandler = (index, name, newValue, lineItem) => {
    if (lineItem) {
      setCustomLineItem((prevCustomLineItem) => {
        const newCustomLineItem = prevCustomLineItem[index].map(
          (category, i) => {
            if (category.id === lineItem.id) {
              newValue = name === "price" ? parseFloat(newValue) : newValue;
              return { ...category, [name]: newValue };
            }
            return category;
          }
        );

        const updatedArray = [...prevCustomLineItem[index]];
        updatedArray[index] = newCustomLineItem;
        return updatedArray;
      });
    } else {
      setCustomObj((prevCustomObj) => {
        const updatedArray = [...prevCustomObj];
        updatedArray[index] = { ...updatedArray[index], [name]: newValue };
        return updatedArray;
      });
    }
  };

  const saveLineItem = (data, type, index) => {
    if (data) {
      data.type = type;
      data.customerId = CUSTOMER_ID;
      data.contractorId = userData.id;
      addNewLineItem(data);
      const newLineItemsLayout = lineItemsLayout.filter(
        (x) => x !== `${type}_${index + 1}`
      );
      setLineItemsLayout(newLineItemsLayout);
      getCustomLine();
      alert("Custom Line Item Saved");
    } else {
      alert("Please fill the fields");
    }
  };
  const removeCustomLine = (data, type, index) => {
    if (data?.id) {
      removeLineItem({ id: data.id });
      getCustomLine();
    }
    const newLineItemsLayout = lineItemsLayout.filter(
      (x) => x !== `${type}_${index + 1}`
    );
    setLineItemsLayout(newLineItemsLayout);
  };
  return (
    <Box maxWidth="md" marginX="auto" px={1} mb={5}>
      <Box sx={{ padding: 4, bgcolor: "white" }}>
        <Typography variant="body1" fontSize={25} fontWeight={600}>
          My Cart
        </Typography>
        {cartItems &&
          cartItems.map(([key, values], i) => {
            values.type = key;
            values.CUSTOMER_ID = CUSTOMER_ID;
            return (
              <Box key={key} mt={2}>
                {values.length > 0 && (
                  <Box>
                    <Typography variant="p" fontSize={22} fontWeight={500}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} Costs
                    </Typography>
                  </Box>
                )}
                {values.map((value, i) => (
                  <ProductCost
                    key={i}
                    setNewPrice={setNewPrice}
                    newPrice={newPrice}
                    info={value}
                  />
                ))}
                {values.length > 0 && (
                  <>
                    <ServiceCost
                      info={values}
                      setServiceTotal={setServiceTotalMyCart}
                    />
                    <Stack py={3} spacing={2} borderBottom="2px solid">
                      {customLineItem[key] &&
                        customLineItem[key].map((lineItem, i) => (
                          <>
                            <Stack
                              key={i}
                              direction="row"
                              justifyContent="space-between"
                            >
                              <div>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    onChangeHandler(
                                      key,
                                      `name`,
                                      e.target.value,
                                      lineItem
                                    );
                                  }}
                                  name={`name_${key}`}
                                  value={lineItem.name}
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    onChangeHandler(
                                      key,
                                      `price`,
                                      e.target.value,
                                      lineItem
                                    );
                                  }}
                                  name={`value_${key}`}
                                  value={lineItem.price}
                                />
                                <button
                                  onClick={() =>
                                    saveLineItem(lineItem, values.type, key)
                                  }
                                  title="Save"
                                >
                                  <DoneIcon style={{ color: "green" }} />
                                </button>
                                <button
                                  onClick={() =>
                                    removeCustomLine(lineItem, values.type, key)
                                  }
                                  title="Remove"
                                >
                                  <CloseIcon style={{ color: "red" }} />
                                </button>
                              </div>
                            </Stack>

                            {/* <DiscountBtn remove={'Remove'} name="*Custom Line Item*" price={btn.price} id={btn.id} /> */}
                            {/* <DiscountBtn lineItem={lineItem} /> */}
                          </>
                        ))}
                      {lineItemsLayout.map((lineitem, index) => {
                        lineitem = lineitem.split("_");
                        lineitem = lineitem[0];
                        if (values.type === lineitem) {
                          return (
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              key={index}
                            >
                              <div>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    onChangeHandler(
                                      index,
                                      `name`,
                                      e.target.value,
                                      false
                                    );
                                  }}
                                  name={`name_${index}`}
                                  value={customObj?.name}
                                  placeholder="*Custom Line Item*"
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    onChangeHandler(
                                      index,
                                      `value`,
                                      e.target.value,
                                      false
                                    );
                                  }}
                                  name={`value_${index}`}
                                  value={customObj?.price && 0}
                                  placeholder="0"
                                />
                                <button
                                  onClick={() =>
                                    saveLineItem(
                                      customObj[index],
                                      values.type,
                                      index
                                    )
                                  }
                                  title="Save"
                                >
                                  <DoneIcon style={{ color: "green" }} />
                                </button>
                                <button
                                  onClick={() =>
                                    removeCustomLine(
                                      customObj[index],
                                      values.type,
                                      index
                                    )
                                  }
                                  title="Remove"
                                >
                                  <CloseIcon style={{ color: "red" }} />
                                </button>
                              </div>
                            </Stack>
                          );
                        }
                      })}

                      <Button
                        variant="text"
                        startIcon={<AddIcon />}
                        sx={{ color: "gray" }}
                        onClick={() => addCustomLineItem(values.type)}
                      >
                        Add Line Item
                      </Button>
                    </Stack>
                  </>
                )}
              </Box>
            );
          })}
        {total > 0 ? (
          <>
            {/* <Stack py={3} spacing={2} borderBottom="2px solid">
                     {customDiscountItem?.map((btn) => (
                        <DiscountBtn name="*Custom Discount Line Item*" price={btn.price} key={btn.id} />
                     ))}
                  </Stack> */}
            <SubTotal
              subtotal={subTotal.toFixed(2)}
              tax={tax.toFixed(2)}
              total={total.toFixed(2)}
            />
          </>
        ) : (
          <Box>No Cart Founded</Box>
        )}
      </Box>
    </Box>
  );
}
