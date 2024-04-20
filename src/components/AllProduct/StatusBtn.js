import { IOSSwitch } from '@/assets/Custom/switchStyle';
import { apiUrl, PLEASE_LOGIN } from '@/Context/constant';
import { addToCartFn, removeToCart } from '@/Context/ProductInfoProvider/actions';
import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { removeLineItem } from '@/Context/utility';
import useToast from '@/lib/hook/useToast';
import { useEffect, useState } from 'react';

// const CUSTOMER_ID = 23;

export default function StatusBtn({ product, selected, setProductId }) {
   // const [userData, setUserData] = useState({});
   const toast = useToast();
   const { dispatch, addtoCart } = useSeletedProduct();
   const [checked, setChecked] = useState(false);

   const userData = typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem('user')) : null;
   const CUSTOMER_ID = userData?.customer_id;
   useEffect(() => {
      // setUserData(userData);
      getCartBycustomer();
   }, [addtoCart, dispatch, product.id, selected]);
   // const CUSTOMER_ID = userData?.customer_id;
   const getCartBycustomer = async () => {
      if (CUSTOMER_ID) {
         const cartSql = `${apiUrl}/api/getcartbycustomer`;
         const cart_res = await fetch(cartSql, {
            method: 'POST', headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerId: CUSTOMER_ID })
         });
         const res = await cart_res.json();
         if (res?.data) {
            const isExist = res?.data?.find((prod) => prod.product_id === product.id);
            if (isExist) {
               setChecked(true);
            } else {
               setChecked(false);
            }
         }
      }
   };

   const handleChange = async (e) => {
      if (!CUSTOMER_ID) {
         alert(PLEASE_LOGIN);
         return false;
      }

      if (['tiles', 'flooring', 'counterTop'].includes(selected)) return toast('This catagory can not be add here', '#e74c3c');
      if (e.target.checked === false) {
         const cartSql = `${apiUrl}/api/removecart`;
         const cart_res = await fetch(cartSql, {
            method: 'POST', headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ Id: product.id, field: "product_id" })
         });
         removeLineItem({ customerId: CUSTOMER_ID, categoryId: product.category_id })
         if (cart_res) {
            setProductId(0)
         }
      }
      setChecked(e.target.checked);
      if (checked)
         return dispatch(
            removeToCart({
               customerId: CUSTOMER_ID,
               id: product.id,
               type: selected,
            })
         );

      const cartData = {
         type: selected,
         img: product.img,
         name: product.name,
         category_id: product.category_id,
         color: product.color,
         vendor: product.vendor_id,
         price: product.price,
         customerId: CUSTOMER_ID,
         id: product.id,
      };
      const apiUrlEndpoint = `${apiUrl}/api/addtocart`;
      const response = await fetch(apiUrlEndpoint, {
         method: 'POST', headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(cartData)
      });
      setProductId(cartData.id)
      const res = await response.json();
      dispatch(
         addToCartFn(cartData)
      );
   };

   return <IOSSwitch onChange={handleChange} checked={checked} />;
}
