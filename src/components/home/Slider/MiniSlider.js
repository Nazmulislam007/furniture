import { selectProduct } from '@/Context/ProductInfoProvider/actions';
import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MiniSlider({ products }) {
   const matches = useMediaQuery('(max-width:760px)');
   const { dispatch, filterByPrice, storeFilterOptions } = useSeletedProduct() || {};

   const filterAllProduct = () => {
      let filterProducts = products;

      if (filterByPrice.min) {
         filterProducts = filterProducts?.filter((prod) => prod.price > filterByPrice.min);
      }

      if (filterByPrice.max) {
         filterProducts = filterProducts?.filter((prod) => (filterByPrice.max === '' ? prod : prod.price < filterByPrice.max));
      }

      if (storeFilterOptions?.length > 0) {
         filterProducts = filterProducts?.filter((prod) =>
            storeFilterOptions?.every((option) => Object.keys(option).every((key) => prod[key] === option[key]))
         );
      }

      return filterProducts;
   };

   return (
      <Swiper
         initialSlide={8}
         modules={[Navigation]}
         spaceBetween={10}
         slidesPerView={4}
         navigation
         breakpoints={{
            480: {
               slidesPerView: 5,
            },
            600: {
               slidesPerView: 6,
            },
            760: {
               slidesPerView: 5,
            },
            900: {
               slidesPerView: 6,
            },
            1200: {
               slidesPerView: 8,
            },
         }}
         className="mySwiper no-user-select"
      >
         {filterAllProduct()?.map((product, i) => (
            <SwiperSlide key={i} className="mini-slider-item" onClick={() => dispatch(selectProduct(product))}>
               <div
                  style={{
                     position: 'relative',
                     height: `${matches ? '80px' : '110px'}`,
                     width: `${matches ? '80px' : '140px'}`,
                  }}
               >
                  <Image
                     src={product.img}
                     alt="Picture of the author"
                     fill
                     sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                     priority
                     as="image"
                  />
                  <span className="price">${product.price}</span>
               </div>
               <Typography textAlign="center" fontWeight="bold" fontSize={{ md: 14, xs: 12 }}>
                  {product.name}
               </Typography>
               <Typography
                  textAlign="center"
                  color="#9e9e9e"
                  mt="-5px"
                  lineHeight={1}
                  marginTop="2px"
                  fontSize={{ md: 15, xs: 13 }}
               >
                  {product.catagory}
               </Typography>
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
