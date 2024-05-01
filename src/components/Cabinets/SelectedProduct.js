import { decreQtyFn, increQtyFn } from '@/Context/ProductInfoProvider/actions';
import { Box, Button, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';

const CUSTOMER_ID = 23;

export default function SelectedProduct({
  item,
  dispatch,
  isExistProducts,
  isExistedHandle,
  handles
}) {
  const { id, name, price, img, quantity, type } = item || {};

  const existProduct = isExistProducts?.find((prod) => prod.id === id);

  const handleIncre = () => {
    if (handles && isExistedHandle) {
      dispatch({
        type: 'INCREMENT_HANDLE_QTY_TO_CART',
        payload: {
          customerId: CUSTOMER_ID,
          type: 'cabinets',
          id
        }
      });
    }

    if (handles) return dispatch({ type: 'INCREMENT_HANDLE_QTY', payload: id });

    if (existProduct) {
      dispatch({
        type: 'INCREMENT_CABINETS_QTY',
        payload: {
          customerId: CUSTOMER_ID,
          type: 'cabinets',
          id
        }
      });
    }

    // add product with clicking increment btn when other product is already existed
    if (isExistProducts?.length > 0 && !existProduct) {
      dispatch({
        type: 'ADD_CABINETS_COLLECTION_TO_CART',
        payload: [
          {
            customerId: CUSTOMER_ID,
            type: 'cabinets',
            ...item,
            myPrice: price,
            catagory: name,
            quantity: 1,
            addedAt: moment().format('DD MMM YYYY')
          }
        ]
      });
    }

    dispatch(increQtyFn(id));
  };

  const handleDecre = () => {
    if (handles && isExistedHandle) {
      dispatch({
        type: 'DECREMENT_HANDLE_QTY_TO_CART',
        payload: {
          customerId: CUSTOMER_ID,
          type: 'cabinets',
          id
        }
      });
    }

    if (handles) return dispatch({ type: 'DECREMENT_HANDLE_QTY', payload: id });

    if (existProduct) {
      dispatch({
        type: 'DECREMENT_CABINETS_QTY',
        payload: {
          customerId: CUSTOMER_ID,
          type: 'cabinets',
          id
        }
      });
    }

    dispatch(decreQtyFn(id));
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
      <Box sx={{ width: 100, height: 100, position: 'relative' }}>
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
          {name}
        </Typography>
        <Typography component="p" fontWeight="500">
          {type === 'handle' ? '2 pieces per pack' : '30W x 30H x 12.5D'}
        </Typography>
        <Typography component="p" fontWeight="500" color="primary" fontSize="18px">
          ${price}
        </Typography>
      </Box>
      <Stack
        direction="row"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: 40, padding: '8px' }}
          onClick={handleDecre}
        >
          -
        </Button>
        <Typography padding="10px 15px">{quantity}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: 40, padding: '8px' }}
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
