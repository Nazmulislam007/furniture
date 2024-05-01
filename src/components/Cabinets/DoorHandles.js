/* eslint-disable default-case */
import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import AddToCartButton from '../AddToCartButton';
import DoorsSlider from './DoorsSlider';
import SelectedProduct from './SelectedProduct';

const CUSTOMER_ID = 23;

export default function DoorHandles() {
  const { addtoCart, handles, dispatch } = useSeletedProduct() || {};

  // if any product of cabinets selected then show door handles
  const isAddProduct = addtoCart[CUSTOMER_ID].product.cabinets?.find(
    (cart) => cart.type === 'cabinets'
  );

  // is the product of handles are exist or not
  const isExistedHandle = addtoCart[CUSTOMER_ID].product.cabinets?.filter(
    (cart) => cart.subType === 'handle'
  );

  // total price and total qantity;
  const totalPrice = handles?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  const handleAddToCart = () => {
    if (isExistedHandle?.length > 0)
      return dispatch({
        type: 'REMOVE_HANDLE_TO_CART',
        payload: {
          customerId: CUSTOMER_ID,
          subType: 'handle',
          type: 'cabinets'
        }
      });

    dispatch({
      type: 'ADD_HANDLE_TO_CART',
      payload: { data: handles, customerId: CUSTOMER_ID, type: 'cabinets' }
    });
  };

  return (
    (isAddProduct || isExistedHandle?.length > 0) && (
      <>
        <Typography component="p" fontSize="25px" marginTop="35px" fontWeight="500">
          Now Select Your Door Handles
        </Typography>
        <Box
          sx={{
            marginBlock: '20px',
            padding: '25px',
            border: '1px solid black',
            backgroundColor: 'white'
          }}
        >
          <DoorsSlider isExistedHandle={isExistedHandle} />
        </Box>

        <Box
          sx={{
            marginBlock: '20px',
            padding: '25px',
            border: '1px solid black',
            backgroundColor: 'white'
          }}
        >
          {handles?.map((item, i) => (
            <SelectedProduct
              item={item}
              key={i}
              dispatch={dispatch}
              handles
              isExistedHandle={isExistedHandle?.length > 0}
            />
          ))}

          <Stack direction="column" alignItems="flex-end" marginBottom="15px">
            <Typography component="p" fontWeight="500">
              Subtotal
            </Typography>
            <Typography component="p" fontSize="20px" color="primary" fontWeight="500">
              ${totalPrice?.toFixed(2)}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            display="flex"
            flexWrap="wrap"
            gap="30px"
            justifyContent="space-between"
            marginTop="25px"
          >
            <Typography component="p" width="400px">
              Please verify all product specifications before adding items to your cart
            </Typography>
            <AddToCartButton
              size="300px"
              isExistProduct={isExistedHandle?.length > 0}
              onClick={handleAddToCart}
            />
          </Stack>
          <Stack alignItems="flex-end" marginBottom="15px">
            <Link
              href="/my-cart"
              onClick={() => {
                dispatch({
                  type: 'REMOVE_HANDLE_TO_CART',
                  payload: {
                    customerId: CUSTOMER_ID,
                    subType: 'handle',
                    type: 'cabinets'
                  }
                });
              }}
            >
              <Typography component="button" color="primary" fontWeight="500">
                Continue without selecting door handles
              </Typography>
            </Link>
          </Stack>
        </Box>
      </>
    )
  );
}
