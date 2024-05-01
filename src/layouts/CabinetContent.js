import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { selectProduct, sortedByFn } from '@/Context/ProductInfoProvider/actions';
import Collection from '@/components/Cabinets/Collection';
import DoorHandles from '@/components/Cabinets/DoorHandles';
import FilterProducts from '@/components/home/FilterProducts';
import LargeSlider from '@/components/home/Slider/LargeSlider';
import MiniSlider from '@/components/home/Slider/MiniSlider';
import { doUpperLower } from '@/lib/doUpperLower';
import { Box, Button, Stack } from '@mui/material';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CabinetContent({ products, pathname }) {
  const { dispatch, sortedBy, watchProductId } = useSeletedProduct();
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);

  let filterProducts;

  switch (sortedBy) {
    case 'Posted: oldest first': {
      filterProducts = products.sort((a, b) =>
        moment(b, 'DD MMM YYYY').diff(moment(a, 'DD MMM YYYY'))
      );
      break;
    }
    case 'Posted: newest first': {
      filterProducts = products.sort((a, b) =>
        moment(a, 'DD MMM YYYY').diff(moment(b, 'DD MMM YYYY'))
      );
      break;
    }
    case 'Posted: lowest first': {
      filterProducts = products.sort((a, b) => a.price - b.price);
      break;
    }
    case 'Posted: highest first': {
      filterProducts = products.sort((a, b) => b.price - a.price);
      break;
    }
    default: {
      return filterProducts;
    }
  }

  const findIndex = filterProducts?.findIndex(
    (prod) =>
      prod.id === watchProductId ||
      prod.drawer?.id === watchProductId ||
      prod.corner?.id === watchProductId
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // show cart item if user click from cart..
    if (findIndex !== -1) dispatch(selectProduct(filterProducts[findIndex]));
    else dispatch(selectProduct(filterProducts[0]));
  }, [dispatch, filterProducts, findIndex]);

  // every time when change the different page, filter dropdown restore it's value
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    dispatch({
      type: 'STORE_FILTER_OPTIONS',
      payload: { name: 'All', value: 'All' }
    });
    dispatch(sortedByFn('Posted: newest first'));
    dispatch({
      type: 'CLEAR_FILTER_PRICE'
    });
  }, [pathname]);

  return (
    <>
      <Head>
        <title>{`${doUpperLower(pathname)} page`}</title>
      </Head>
      <Box maxWidth="lg" marginX="auto" px={1} mb={10}>
        <MiniSlider products={filterProducts} pathname={pathname} />
        <Box sx={{ background: 'black', marginBlock: '5px' }}>
          <Button
            sx={{ color: 'white', paddingInline: '20px' }}
            onClick={() => setShowFilterDropDown(!showFilterDropDown)}
          >
            Add Filter + Sort
          </Button>
          {showFilterDropDown && <FilterProducts pathname={pathname} />}
        </Box>
        <LargeSlider />
        <Collection />
        <DoorHandles />
        <Stack direction="column" alignItems="flex-end" marginBottom="15px">
          <Link href="/login">
            <Button
              variant="button"
              sx={{
                background: 'gray',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'gray'
                }
              }}
            >
              Login
            </Button>{' '}
          </Link>
        </Stack>
      </Box>
    </>
  );
}
