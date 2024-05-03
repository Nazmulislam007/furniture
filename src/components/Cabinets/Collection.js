import { useSeletedProduct } from "@/Context/ProductInfoProvider/ProductInfoProvider";
import { addCabinetsCollectionFn } from "@/Context/ProductInfoProvider/actions";
import { PLEASE_LOGIN } from "@/Context/constant";
import {
  cabinetsCart,
  deleteAllCabinetsFromCart,
  getCabinetsCartDb,
  getCorners,
  getDrawersFromDb
} from "@/Context/utility";
import loggedInUser from "@/lib/isUserAvailable";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AddToCartButton from "../AddToCartButton";
import SelectedProduct from "./SelectedProduct";

export default function Collection() {
  const CUSTOMER_ID = loggedInUser?.customer_id;
  const [drawer, setDrawer] = useState({});
  const [corner, setCorner] = useState({});
  const {
    selectedProduct,
    dispatch,
    collection,
    isExistCabinetsInDB,
    setIsExistCabinetsInDB,
    fetchCabinetsCart,
    setFetchCabinetsCart,
    addtoCart
  } = useSeletedProduct() || {};
  const { product_id, name, price, img, drawer_id, corner_id, color } = selectedProduct || {};

  async function getDrawers(drawer_id) {
    try {
      const data = await getDrawersFromDb(drawer_id);
      setDrawer(data);
    } catch (error) {
      console.log(`Fetching drawer error: ${error}`);
    }
  }

  async function fetchCornerData(corner_id) {
    try {
      const data = await getCorners(corner_id);
      setCorner(data);
    } catch (error) {
      console.log(`Fetching corner error: ${error}`);
    }
  }

  async function getCabinetsCart(CUSTOMER_ID, id, drawer_id, corner_id) {
    try {
      const data = await getCabinetsCartDb(CUSTOMER_ID, id, drawer_id, corner_id);
      setIsExistCabinetsInDB(data);
    } catch (error) {
      console.log(`Fetching cabinets cart error: ${error}`);
    }
  }

  useEffect(() => {
    if (product_id && drawer_id) {
      getDrawers(drawer_id);
    }
  }, [product_id, drawer_id]);

  useEffect(() => {
    if (product_id && corner_id) {
      fetchCornerData(corner_id);
    }
  }, [product_id, corner_id]);

  // console.log(addtoCart[CUSTOMER_ID].product);

  // is the prododuct already added in the cart?
  // const isExistProducts = addtoCart[CUSTOMER_ID].product.cabinets?.filter(
  //   (cart) => cart.id === id || cart.id === drawer?.id || cart.id === corner?.id
  // );

  useEffect(() => {
    if (CUSTOMER_ID) {
      if (product_id || drawer_id || corner_id)
        getCabinetsCart(CUSTOMER_ID, product_id, drawer_id, corner_id);
    }
  }, [CUSTOMER_ID, product_id, drawer_id, corner_id, fetchCabinetsCart]);

  // is the product of handles are exist or not
  // const isExistHandles = addtoCart[CUSTOMER_ID].product.cabinets?.find((cart) => cart.id === handles[0]?.id);

  const initialCollectionState = useMemo(
    () => [
      {
        product_id: drawer?.drawer_id,
        product_name: `${name}+Drawer`,
        price: drawer?.price,
        img: drawer?.img,
        quantity: 0,
        color: drawer?.color
      },
      { product_id, product_name: `${name} only`, price, img, quantity: 0, color },
      {
        product_id: corner?.corner_id,
        product_name: `${name} corner`,
        price: corner?.price,
        img: corner?.img,
        quantity: 0,
        color: corner?.color
      }
    ],
    [color, corner, drawer, product_id, img, name, price]
  );

  const setZeroQtyCollection = initialCollectionState.filter((prod) =>
    isExistCabinetsInDB.every((col) => col.product_id !== prod.product_id)
  );

  // // inital collection
  useEffect(() => {
    if (isExistCabinetsInDB.length > 0)
      return dispatch(
        addCabinetsCollectionFn(
          setZeroQtyCollection.length > 0
            ? [...isExistCabinetsInDB, ...setZeroQtyCollection]
            : isExistCabinetsInDB
        )
      );

    dispatch(addCabinetsCollectionFn(initialCollectionState));
  }, [initialCollectionState, isExistCabinetsInDB]);

  // total price
  const totalPrice = collection?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  // my set price
  // const mySetPrice = addtoCart[CUSTOMER_ID].myPrice.cabinets;
  const myPrice = 10;
  // mySetPrice.sign === "%"
  //   ? ((selectedProduct?.price / 100) * mySetPrice?.price).toFixed(2)
  //   : mySetPrice.price;

  const handleAddToCart = async () => {
    if (!CUSTOMER_ID) {
      alert(PLEASE_LOGIN);
      return false;
    }

    if (isExistCabinetsInDB.length > 0) {
      await deleteAllCabinetsFromCart(
        CUSTOMER_ID,
        isExistCabinetsInDB.map((prod) => `'${prod.product_id}'`)
      );
      setFetchCabinetsCart((prev) => prev + 1);
      // dispatch({
      //   type: "REMOVE_CABINETS_COLLECTION_FROM_CART",
      //   payload: {
      //     customerId: CUSTOMER_ID,
      //     type: "cabinets",
      //     ids: isExistProducts.map((prod) => prod.product_id)
      //   }
      // });

      // if remove the cart of cabinet then remove all handles also...

      // if (isExistHandles)
      //    dispatch(
      //       removeToCart({
      //          customerId: CUSTOMER_ID,
      //          id: isExistHandles.id,
      //          type: 'cabinets',
      //       })
      //    );
      return;
    }

    // if collection has the quantity above 0 then add to the cart
    const cabinetCollection = collection
      .filter((prod) => prod.quantity > 0)
      .map((prod) => ({
        ...prod,
        type: "cabinets",
        myPrice: +myPrice + prod.price,
        vendor: selectedProduct.vendor,
        customerId: CUSTOMER_ID
      }));

    if (cabinetCollection.length === 0) return alert("You must select at least one product");

    try {
      await cabinetsCart(cabinetCollection, 7);
      setFetchCabinetsCart((prev) => prev + 1);
    } catch (error) {
      console.log(`Adding cabinet cart error: ${error}`);
    }

    // dispatch({
    //   type: "ADD_CABINETS_COLLECTION_TO_CART",
    //   payload: cabinetCollection
    // });
  };

  return (
    <Box
      sx={{
        marginBlock: "20px",
        padding: "25px",
        border: "1px solid black",
        backgroundColor: "white"
      }}
    >
      <Box marginBottom="20px">
        <Typography component="h4" fontSize="25px">
          {name} Collection
        </Typography>
        <Typography component="span" color="primary">
          Available Products in this collection
        </Typography>
      </Box>

      {collection?.map((item, i) => (
        <SelectedProduct
          key={i}
          item={{ ...item, vendor: selectedProduct?.vendor }}
          dispatch={dispatch}
          isExistCabinetsInDB={isExistCabinetsInDB}
          CUSTOMER_ID={CUSTOMER_ID}
          setFetchCabinetsCart={setFetchCabinetsCart}
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
      >
        <Typography component="p" width="400px">
          Please verify all product specifications before adding items to your cart
        </Typography>
        <AddToCartButton
          size="300px"
          isExistProduct={isExistCabinetsInDB.length > 0}
          onClick={handleAddToCart}
        />
      </Stack>
    </Box>
  );
}
