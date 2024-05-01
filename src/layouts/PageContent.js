import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { selectProduct } from '@/Context/ProductInfoProvider/actions';
/* eslint-disable default-case */
import FilterProducts from '@/components/home/FilterProducts';
import ProductDescription from '@/components/home/ProductInfo/ProductDescription';
import ProductSelection from '@/components/home/ProductInfo/ProductSelection/ProductSelection';
import LargeSlider from '@/components/home/Slider/LargeSlider';
import MiniSlider from '@/components/home/Slider/MiniSlider';
import { Box, Button } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function PageContent({ products, pathname }) {
  const { dispatch, sortedBy } = useSeletedProduct();
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);

  let filterProducts;

  switch (sortedBy) {
    case 'Posted: oldest first': {
      filterProducts = products.sort((a, b) => b.created_at - a.created_at);
      break;
    }
    case 'Posted: newest first': {
      filterProducts = products.sort((a, b) => a.created_at - b.created_at);
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
  }

  useEffect(() => {
    dispatch(selectProduct(filterProducts[0]));
  }, [dispatch, filterProducts]);

  return (
    <>
      <Head>
        <title>{`${pathname} page`}</title>
      </Head>
      <Box maxWidth="lg" marginX="auto" px={1} mb={10}>
        <MiniSlider products={filterProducts} />
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
        <Box
          sx={{
            marginBlock: '20px',
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <ProductDescription />
          <ProductSelection pathname={pathname} />
        </Box>
      </Box>
    </>
  );
}
