import { useSeletedProduct } from "@/Context/ProductInfoProvider/ProductInfoProvider";
import { addDoorHandlesFn, removeDoorHandlesFn } from "@/Context/ProductInfoProvider/actions";
import {
  cabinetsCart,
  deleteAllCabinetsFromCart,
  getHandlesfromDB,
  getHanldesFromCart
} from "@/Context/utility";
import loggedInUser from "@/lib/isUserAvailable";
import { Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DoorsSlider({ isExistedHandle }) {
  const CUSTOMER_ID = loggedInUser?.customer_id;
  const [products, setProducts] = useState([]);
  const matches = useMediaQuery("(max-width:760px)");
  const {
    dispatch,
    handles,
    fetchHandlesCart,
    setIsExistedHandlesInDB,
    isExistedHandlesInDB,
    addtoCart,
    setFetchHandlesCart
  } = useSeletedProduct() || {};

  async function getHandles() {
    try {
      const data = await getHandlesfromDB();
      setProducts(data);
    } catch (error) {
      console.log(`Get handles error: ${error}`);
    }
  }

  useEffect(() => {
    getHandles();
  }, [fetchHandlesCart]);

  const isAdded = (id) => {
    const isExist = (isExistedHandlesInDB.length > 0 ? isExistedHandlesInDB : handles)?.find(
      (item) => item.product_id === id
    );
    if (isExist) return "Added";
    return "";
  };

  async function fetchHandlesFromDB() {
    try {
      const data = await getHanldesFromCart();
      setIsExistedHandlesInDB(data);
    } catch (error) {
      console.log(`fetch handles error : ${error}`);
    }
  }

  // get handles from cart
  useEffect(() => {
    fetchHandlesFromDB();
  }, [fetchHandlesCart]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_HANDLE_STATE",
      payload: isExistedHandle
    });
  }, [dispatch]);

  // total price and total qantity;
  const totalPrice = isExistedHandle?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  // my set price
  const mySetPrice = addtoCart[CUSTOMER_ID].myPrice.cabinets;
  const myPrice =
    mySetPrice.sign === "%" ? ((totalPrice / 100) * mySetPrice.price).toFixed(2) : mySetPrice.price;

  const handleAddProduct = async (product) => {
    const isExisted = isExistedHandlesInDB?.find((item) => item.product_id === product.product_id);

    if (isAdded(product.product_id) !== "") {
      dispatch(removeDoorHandlesFn(product.product_id));

      if (isExisted) {
        deleteAllCabinetsFromCart(CUSTOMER_ID, [`'${isExisted.product_id}'`]);
        setFetchHandlesCart((prev) => prev + 1);
        // dispatch({
        //   type: "REMOVE_SINGLE_HANDLE_TO_CART",
        //   payload: {
        //     customerId: CUSTOMER_ID,
        //     id: isExisted.product_id,
        //     subType: "handle",
        //     type: "cabinets"
        //   }
        // });
      }
      return;
    }

    // add product when other product is already existed
    if (isExistedHandlesInDB?.length > 0 && !isExisted) {
      try {
        await cabinetsCart(
          [
            {
              ...product,
              quantity: 1,
              myPrice: +myPrice + +product.price,
              type: "cabinets",
              subType: "handle",
              customerId: CUSTOMER_ID
            }
          ],
          8
        );
        setFetchHandlesCart((prev) => prev + 1);
      } catch (error) {
        console.log(`Adding cabinet cart error: ${error}`);
      }
      // dispatch({
      //   type: "ADD_HANDLE_TO_CART",
      //   payload: {
      //     data: [
      //       {
      //         ...product,
      //         quantity: 1,
      //         myPrice: +myPrice + +product.price,
      //         type: "cabinets",
      //         subType: "handle",
      //         customerId: CUSTOMER_ID
      //       }
      //     ],
      //     customerId: CUSTOMER_ID,
      //     type: "cabinets",
      //     subType: "handle"
      //   }
      // });
    }

    dispatch(
      addDoorHandlesFn({
        ...product,
        quantity: 1,
        myPrice: +myPrice + +product.price,
        type: "cabinets",
        subType: "handle",
        customerId: CUSTOMER_ID
      })
    );
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
          slidesPerView: 5
        },
        600: {
          slidesPerView: 6
        },
        760: {
          slidesPerView: 5
        },
        900: {
          slidesPerView: 6
        },
        1200: {
          slidesPerView: 8
        }
      }}
      className="mySwiper no-user-select"
    >
      {products?.map((product, i) => (
        <SwiperSlide key={i} className="mini-slider-item" onClick={() => handleAddProduct(product)}>
          <div
            style={{
              position: "relative",
              height: `${matches ? "80px" : "110px"}`,
              width: `${matches ? "80px" : "140px"}`,
              margin: "0 auto"
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
            {product.product_name}
          </Typography>
          <Typography textAlign="center" fontWeight="bold">
            {isAdded(product.product_id)}
          </Typography>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
