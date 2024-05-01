import { useCustomers } from '@/Context/CustomersProvider/CustomersProvider';
import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import CustomerDetails from '@/components/Cart/Customer/CustomerDetails';
import CustomerList from '@/components/Cart/Customer/CustomerList';
import MyCart from '@/pages/my-cart';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CUSTOMER_ID = 23;

export default function CustomerCart() {
  // let CUSTOMER_ID = userData.customer_id;
  const router = useRouter();
  const [discountPrice, setDiscountPrice] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const { addtoCart, dispatch } = useSeletedProduct() || {};
  const [serviceTotal, setServiceTotal] = useState(0);
  const [userData, setUserData] = useState({});
  const cartItems = Object.entries(addtoCart[CUSTOMER_ID].product);

  const { selectedCustomer, customers } = useCustomers() || {};

  // const { id, fname, lname, phone, city, state, email, address } = customers.find((cus) => cus.id === selectedCustomer);

  useEffect(() => {
    const userData =
      typeof window !== 'undefined' ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    setUserData(userData);
  }, []);

  // sum of the total amount;
  const totalProductAmount = Object.keys(addtoCart[CUSTOMER_ID].product).reduce(
    (accumulator, currentKey) => {
      const items = addtoCart[CUSTOMER_ID].product[currentKey];
      if (items && items.length > 0) {
        return (
          accumulator +
          items.reduce((sum, item) => (sum + item.totalPrice ? +item.totalPrice : +item.price), 0)
        );
      }
      return accumulator;
    },
    0
  );

  const subTotal = +serviceTotal + +totalProductAmount;
  const tax = (subTotal / 100) * 13;
  const total = (subTotal / 100) * 13 + subTotal;

  const handleLineItem = (key) => {
    dispatch({
      type: 'ADD_LINE_ITEM',
      payload: {
        customerId: CUSTOMER_ID,
        price: itemPrice,
        id: Date.now(),
        type: key
      }
    });
  };

  const handleDiscountBtn = () => {
    dispatch({
      type: 'ADD_DISCOUNT_LINE_ITEM',
      payload: {
        id: Date.now(),
        customerId: CUSTOMER_ID,
        price: discountPrice
      }
    });
  };

  return (
    <Box maxWidth="lg" marginX="auto" px={1} mb={5} mt={2}>
      <Stack
        direction="row"
        gap={2}
        display="flex"
        flexWrap={{ lg: 'nowrap', xs: 'wrap' }}
        justifyContent="center"
      >
        <CustomerList />
        <Stack spacing={2}>
          <MyCart customerId={router.query.id} />
          {/* <Box sx={{ padding: 4, bgcolor: 'white', flex: 1 }}>
                  <Typography variant="body1" fontSize={25} fontWeight={600} mb={2}>
                     My Cart
                  </Typography>
                  {cartItems.map(([key, values]) => (
                     <Box key={key} mt={2}>
                        {values.length > 0 && (
                           <Box>
                              <Typography variant="p" fontSize={22} fontWeight={500}>
                                 {key.charAt(0).toUpperCase() + key.slice(1)} Costs
                              </Typography>
                           </Box>
                        )}
                        {values.map((value, i) => (
                           <ProductCost key={i} info={value} location />
                        ))}
                        {values.length > 0 && (
                           <>
                              <ServiceCost info={values} setServiceTotal={setServiceTotal} />
                              <Stack py={3} spacing={2} borderBottom="2px solid">
                                 {addtoCart[CUSTOMER_ID].customLineItem[key].map((btn) => (
                                    <DiscountBtn
                                       name="*Custom Line Item*"
                                       remove="Remove"
                                       price={btn.price}
                                       id={btn.id}
                                       customerId={CUSTOMER_ID}
                                       type={key}
                                       key={btn.id}
                                    />
                                 ))}
                                 <Stack direction="row">
                                    <Button variant="text" sx={{ width: 'fit-content' }} onClick={() => handleLineItem(key)}>
                                       Add new line item
                                    </Button>
                                    <Box width="70px">
                                       <TextInput
                                          type="number"
                                          value={itemPrice}
                                          onChange={(e) => setItemPrice(e.target.value)}
                                       />
                                    </Box>
                                 </Stack>
                              </Stack>
                           </>
                        )}
                     </Box>
                  ))}
                  {total > 0 ? (
                     <>
                        <Stack py={3} spacing={2} borderBottom="2px solid">
                           {addtoCart[CUSTOMER_ID].customDiscountItem?.map((btn) => (
                              <DiscountBtn
                                 name="*Custom Discount Line Item*"
                                 remove="Remove"
                                 price={btn.price}
                                 id={btn.id}
                                 customerId={CUSTOMER_ID}
                                 key={btn.id}
                              />
                           ))}
                           <Stack direction="row">
                              <Button variant="text" sx={{ width: 'fit-content' }} onClick={handleDiscountBtn}>
                                 Add new discount item
                              </Button>
                              <Box width="70px">
                                 <TextInput
                                    type="number"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                 />
                              </Box>
                           </Stack>
                        </Stack>
                        <SubTotal subtotal={subTotal.toFixed(2)} tax={tax.toFixed(2)} total={total.toFixed(2)} />
                     </>
                  ) : (
                     <Box>No Cart Founded</Box>
                  )}
               </Box> */}
          <CustomerDetails />
        </Stack>
      </Stack>
    </Box>
  );
}
