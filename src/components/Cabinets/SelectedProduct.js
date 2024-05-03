import { decreQtyFn, increQtyFn } from "@/Context/ProductInfoProvider/actions";
import { cabinetsCart, deleteAllCabinetsFromCart, incrementCabinteQty } from "@/Context/utility";
import { Box, Button, Stack, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";

export default function SelectedProduct({
  item,
  dispatch,
  isExistCabinetsInDB,
  isExistedHandle,
  handles,
  CUSTOMER_ID,
  setFetchCabinetsCart,
  setFetchHandlesCart
}) {
  const { product_id, name, product_name, price, img, quantity, type, color, subtotal } =
    item || {};

  const existProduct = isExistCabinetsInDB?.find((prod) => prod.product_id === product_id);

  const handleIncre = async () => {
    const action = "increment";

    if (handles && isExistedHandle) {
      await incrementCabinteQty(CUSTOMER_ID, product_id, quantity + 1, price, action, subtotal, 8);
      setFetchHandlesCart((prev) => prev + 1);
      // dispatch({
      //   type: "INCREMENT_HANDLE_QTY_TO_CART",
      //   payload: {
      //     customerId: CUSTOMER_ID,
      //     type: "cabinets",
      //     product_id
      //   }
      // });
    }

    if (handles) return dispatch({ type: "INCREMENT_HANDLE_QTY", payload: product_id });

    if (existProduct) {
      await incrementCabinteQty(
        CUSTOMER_ID,
        existProduct.product_id,
        existProduct.quantity + 1,
        price,
        action,
        existProduct.subtotal,
        7
      );

      setFetchCabinetsCart((prev) => prev + 1);

      dispatch({
        type: "INCREMENT_CABINETS_QTY",
        payload: {
          customerId: CUSTOMER_ID,
          type: "cabinets",
          product_id
        }
      });
    }

    // add product with clicking increment btn when other product is already existed
    if (isExistCabinetsInDB?.length > 0 && !existProduct) {
      await cabinetsCart(
        [
          {
            customerId: CUSTOMER_ID,
            product_id,
            price,
            img,
            product_name,
            quantity: 1,
            color
          }
        ],
        7
      );

      dispatch({
        type: "ADD_CABINETS_COLLECTION_TO_CART",
        payload: [
          {
            customerId: CUSTOMER_ID,
            type: "cabinets",
            ...item,
            myPrice: price,
            catagory: name,
            quantity: 1,
            addedAt: moment().format("DD MMM YYYY")
          }
        ]
      });
    }

    dispatch(increQtyFn(product_id));
  };

  const handleDecre = async () => {
    const action = "decrement";
    if (handles && isExistedHandle) {
      if (quantity - 1 === 0) {
        deleteAllCabinetsFromCart(CUSTOMER_ID, [`'${product_id}'`]);
      }

      if (quantity - 1 > 0) {
        await incrementCabinteQty(
          CUSTOMER_ID,
          product_id,
          quantity - 1,
          price,
          action,
          subtotal,
          8
        );
      }

      setFetchHandlesCart((prev) => prev + 1);

      // dispatch({
      //   type: "DECREMENT_HANDLE_QTY_TO_CART",
      //   payload: {
      //     customerId: CUSTOMER_ID,
      //     type: "cabinets",
      //     product_id
      //   }
      // });
    }

    if (handles) return dispatch({ type: "DECREMENT_HANDLE_QTY", payload: product_id });

    if (existProduct) {
      if (existProduct.quantity - 1 === 0) {
        deleteAllCabinetsFromCart(CUSTOMER_ID, [`'${existProduct.product_id}'`]);
      }

      if (existProduct.quantity - 1 > 0) {
        await incrementCabinteQty(
          CUSTOMER_ID,
          existProduct.product_id,
          existProduct.quantity - 1,
          price,
          action,
          existProduct.subtotal,
          7
        );
      }

      setFetchCabinetsCart((prev) => prev - 1);

      dispatch({
        type: "DECREMENT_CABINETS_QTY",
        payload: {
          customerId: CUSTOMER_ID,
          type: "cabinets",
          product_id
        }
      });
    }

    dispatch(decreQtyFn(product_id));
  };

  return (
    <Stack
      direction="row"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap="20px"
      marginBottom="10px"
      padding="15px"
      borderBottom="2px solid"
    >
      <Box sx={{ width: 100, height: 100, position: "relative" }}>
        {img && (
          <Image
            src={img}
            alt="Picture of the author"
            fill
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
            priority
            as="image"
          />
        )}
      </Box>
      <Box>
        <Typography component="p" fontSize="18px">
          {product_name}
        </Typography>
        <Typography component="p" fontWeight="500">
          {type === "handle" ? "2 pieces per pack" : "30W x 30H x 12.5D"}
        </Typography>
        <Typography component="p" fontWeight="500" color="primary" fontSize="18px">
          ${price && Number(price).toFixed(2)}
        </Typography>
      </Box>
      <Stack
        direction="row"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: 40, padding: "8px" }}
          onClick={handleDecre}
        >
          -
        </Button>
        <Typography padding="10px 15px">{quantity}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: 40, padding: "8px" }}
          onClick={handleIncre}
        >
          +
        </Button>
      </Stack>
      <Typography component="p" fontSize="24px" fontWeight="500" color="primary">
        = ${(price * quantity).toFixed(2)}
      </Typography>
    </Stack>
  );
}
