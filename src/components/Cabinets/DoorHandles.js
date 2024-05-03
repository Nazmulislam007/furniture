/* eslint-disable default-case */
import { useSeletedProduct } from "@/Context/ProductInfoProvider/ProductInfoProvider";
import { cabinetsCart, deleteAllCabinetsFromCart } from "@/Context/utility";
import loggedInUser from "@/lib/isUserAvailable";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import DoorsSlider from "./DoorsSlider";
import SelectedProduct from "./SelectedProduct";

export default function DoorHandles() {
  const CUSTOMER_ID = loggedInUser?.customer_id;
  const {
    addtoCart,
    handles,
    isExistCabinetsInDB,
    setFetchHandlesCart,
    dispatch,
    isExistedHandlesInDB
  } = useSeletedProduct() || {};

  // if any product of cabinets selected then show door handles
  // const isAddProduct = addtoCart[CUSTOMER_ID].product.cabinets?.find(
  //   (cart) => cart.type === "cabinets"
  // );

  // is the product of handles are exist or not
  // const isExistedHandle = addtoCart[CUSTOMER_ID].product.cabinets?.filter(
  //   (cart) => cart.subType === "handle"
  // );

  // total price and total qantity;
  const totalPrice = handles?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  const handleAddToCart = async () => {
    // if (isExistedHandle?.length > 0) {
    //   return dispatch({
    //     type: "REMOVE_HANDLE_TO_CART",
    //     payload: {
    //       customerId: CUSTOMER_ID,
    //       subType: "handle",
    //       type: "cabinets"
    //     }
    //   });
    // }

    if (isExistedHandlesInDB?.length > 0) {
      deleteAllCabinetsFromCart(
        CUSTOMER_ID,
        isExistedHandlesInDB.map((handle) => `'${handle.product_id}'`)
      );
      setFetchHandlesCart((prev) => prev + 1);
    }

    if (!isExistedHandlesInDB?.length) {
      try {
        await cabinetsCart(handles, 8);
        setFetchHandlesCart((prev) => prev + 1);
      } catch (error) {
        console.log(`Adding cabinet cart error: ${error}`);
      }

      // dispatch({
      //   type: "ADD_HANDLE_TO_CART",
      //   payload: { data: handles, customerId: CUSTOMER_ID, type: "cabinets" }
      // });
    }
  };

  return (
    (isExistCabinetsInDB.length > 0 || isExistedHandlesInDB?.length > 0) && (
      <>
        <Typography component="p" fontSize="25px" marginTop="35px" fontWeight="500">
          Now Select Your Door Handles
        </Typography>
        <Box
          sx={{
            marginBlock: "20px",
            padding: "25px",
            border: "1px solid black",
            backgroundColor: "white"
          }}
        >
          <DoorsSlider isExistedHandle={isExistedHandlesInDB} />
        </Box>

        <Box
          sx={{
            marginBlock: "20px",
            padding: "25px",
            border: "1px solid black",
            backgroundColor: "white"
          }}
        >
          {(isExistedHandlesInDB?.length > 0 ? isExistedHandlesInDB : handles)?.map((item, i) => (
            <SelectedProduct
              item={item}
              key={i}
              dispatch={dispatch}
              handles
              CUSTOMER_ID={CUSTOMER_ID}
              isExistedHandle={isExistedHandlesInDB?.length > 0}
              setFetchHandlesCart={setFetchHandlesCart}
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
              isExistProduct={isExistedHandlesInDB?.length > 0}
              onClick={handleAddToCart}
            />
          </Stack>
          <Stack alignItems="flex-end" marginBottom="15px">
            <Link
              href="/my-cart"
              onClick={() => {
                dispatch({
                  type: "REMOVE_HANDLE_TO_CART",
                  payload: {
                    customerId: CUSTOMER_ID,
                    subType: "handle",
                    type: "cabinets"
                  }
                });
              }}
            >
              <Typography
                component="button"
                color="primary"
                fontWeight="500"
                onClick={() => {
                  if (isExistedHandlesInDB.length > 0) {
                    deleteAllCabinetsFromCart(
                      CUSTOMER_ID,
                      isExistedHandlesInDB.map((handle) => `'${handle.product_id}'`)
                    );
                    setFetchHandlesCart((prev) => prev + 1);
                  }
                }}
              >
                Continue without selecting door handles
              </Typography>
            </Link>
          </Stack>
        </Box>
      </>
    )
  );
}
