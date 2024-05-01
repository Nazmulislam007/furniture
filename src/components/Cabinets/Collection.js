import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { addCabinetsCollectionFn } from '@/Context/ProductInfoProvider/actions';
import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import AddToCartButton from '../AddToCartButton';
import SelectedProduct from './SelectedProduct';

const CUSTOMER_ID = 23;

export default function Collection() {
  const { selectedProduct, dispatch, collection, addtoCart } = useSeletedProduct() || {};
  const { id, name, price, img, drawer, corner, color, catagory } = selectedProduct || {};

  // console.log(addtoCart[CUSTOMER_ID].product);

  // is the prododuct already added in the cart?
  const isExistProducts = addtoCart[CUSTOMER_ID].product.cabinets?.filter(
    (cart) => cart.id === id || cart.id === drawer?.id || cart.id === corner?.id
  );

  // console.log(isExistProducts);

  // is the product of handles are exist or not
  // const isExistHandles = addtoCart[CUSTOMER_ID].product.cabinets?.find((cart) => cart.id === handles[0]?.id);

  const initialCollectionState = useMemo(
    () => [
      {
        id: drawer?.id,
        name: `${name}+Drawer`,
        price: drawer?.price,
        img: drawer?.img,
        quantity: 0,
        color: drawer?.color
      },
      { id, name: `${name} only`, price, img, quantity: 0, color },
      {
        id: corner?.id,
        name: `${name} corner`,
        price: corner?.price,
        img: corner?.img,
        quantity: 0,
        color: corner?.color
      }
    ],
    [color, corner, drawer, id, img, name, price]
  );

  const setZeroQtyCollection = initialCollectionState.filter((prod) =>
    isExistProducts.every((col) => col.id !== prod.id)
  );

  // inital collection
  useEffect(() => {
    if (isExistProducts.length > 0)
      return dispatch(
        addCabinetsCollectionFn(
          setZeroQtyCollection.length > 0
            ? [...isExistProducts, ...setZeroQtyCollection]
            : isExistProducts
        )
      );

    dispatch(addCabinetsCollectionFn(initialCollectionState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, corner, dispatch, drawer, id, img, name, price, catagory]);

  // total price
  const totalPrice = collection?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  // my set price
  const mySetPrice = addtoCart[CUSTOMER_ID].myPrice.cabinets;
  const myPrice =
    mySetPrice.sign === '%'
      ? ((selectedProduct.price / 100) * mySetPrice.price).toFixed(2)
      : mySetPrice.price;

  const handleAddToCart = () => {
    if (isExistProducts.length > 0) {
      dispatch({
        type: 'REMOVE_CABINETS_COLLECTION_FROM_CART',
        payload: {
          customerId: CUSTOMER_ID,
          type: 'cabinets',
          ids: isExistProducts.map((prod) => prod.id)
        }
      });

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
        type: 'cabinets',
        myPrice: +myPrice + prod.price,
        vendor: selectedProduct.vendor,
        customerId: CUSTOMER_ID,
        catagory: prod.name,
        addedAt: moment().format('DD MMM YYYY')
      }));

    if (cabinetCollection.length === 0) return;

    dispatch({
      type: 'ADD_CABINETS_COLLECTION_TO_CART',
      payload: cabinetCollection
    });
  };

  return (
    <Box
      sx={{
        marginBlock: '20px',
        padding: '25px',
        border: '1px solid black',
        backgroundColor: 'white'
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
          item={{ ...item, vendor: selectedProduct.vendor }}
          dispatch={dispatch}
          isExistProducts={isExistProducts}
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
          isExistProduct={isExistProducts.length > 0}
          onClick={handleAddToCart}
        />
      </Stack>
    </Box>
  );
}
