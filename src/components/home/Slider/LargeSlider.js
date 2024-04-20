import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import Image from 'next/image';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function LargeSlider() {
   const { selectedProduct } = useSeletedProduct();
   const relatedImg = selectedProduct?.relatedImg && JSON.parse(selectedProduct.relatedImg);
   return (
      <Swiper modules={[Navigation]} spaceBetween={10} navigation className="mySwiper no-user-select slider-item">
         {relatedImg && relatedImg?.map((img, i) => (
            <SwiperSlide key={i}>
               <Image
                  src={img}
                  alt="Picture of the author"
                  fill
                  sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                  priority
                  as="image"
                  style={{ objectFit: 'cover' }}
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
