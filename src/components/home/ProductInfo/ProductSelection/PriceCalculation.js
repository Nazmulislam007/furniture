import TextInput from "@/components/TextInput";
import { apiUrl, PLEASE_LOGIN, TAX_PERCENT } from "@/Context/constant";
import { useCustomers } from "@/Context/CustomersProvider/CustomersProvider";
import { useSeletedProduct } from "@/Context/ProductInfoProvider/ProductInfoProvider";
import {
  getCartByCustomer,
  getCategory,
  getMyPrice,
  updateCartQty,
} from "@/Context/utility";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PriceCalculation({ name, CUSTOMER_ID }) {
  const { addtoCart, selectedProduct, dispatch } = useSeletedProduct();
  const { price } = selectedProduct;
  const sqft = selectedProduct["sqft/case"];
  const [inputSqft, setInputSqft] = useState("");
  const [showCalc, setShowCalc] = useState(false);
  const [result, setShowResult] = useState({
    totalCase: 0,
    customerSqft: 0,
    totalPrice: 0,
  });
  const [cartItems, setCartItems] = useState([]);
  const [myPrices, setMyPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [isExistProduct, setIsExistProduct] = useState("");

  useEffect(() => {
    if (CUSTOMER_ID) {
      getMyPriceData();
      getAllCartBycustomer();
    }
  }, [CUSTOMER_ID]);

  const getAllCartBycustomer = async () => {
    const category = await getCategory();
    const newArr = [];
    category.filter((x) => {
      return newArr.push({ id: x.id, category: x.url });
    });
    let cartData = await getCartByCustomer({ CUSTOMER_ID });

    let cate = {};
    newArr.map((elem) => {
      cate[elem.category] = cartData.filter((z) => z.category_id === elem.id);
    });
    setCartItems(cate);
    const isExistProduct = cate[name]?.find(
      (cart) => cart.product_id === selectedProduct.id
    );
    setIsExistProduct(isExistProduct);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputSqft === "") return setShowCalc(false);
    setShowCalc(true);
    setShowResult({
      ...result,
      totalCase: inputSqft / Number(sqft),
      customerSqft: inputSqft,
      totalPrice:
        Math.ceil(inputSqft / Number(sqft)) *
        Number(sqft) *
        Number(selectedProduct.price),
    });
  };
  const getMyPriceData = async () => {
    const mp_result = await getMyPrice({ CUSTOMER_ID });
    setMyPrices(mp_result);
  };
  // is the product exist already or not.

  const mySetPrice = CUSTOMER_ID && addtoCart[CUSTOMER_ID]?.myPrice[name];

  const myPrice =
    mySetPrice && mySetPrice?.sign === "%"
      ? ((selectedProduct?.price / 100) * mySetPrice?.price).toFixed(2)
      : mySetPrice?.price;

  useEffect(() => {
    setQuantity(isExistProduct?.quantity);
    setTotalPrice(Number(isExistProduct?.total));
    setSubTotalPrice(Number(isExistProduct?.subtotal).toFixed(2));
  }, [isExistProduct]);

  const handleClick = async () => {
    if (!CUSTOMER_ID) {
      alert(PLEASE_LOGIN);
      return false;
    }

    if (isExistProduct) {
      const cartSql = `${apiUrl}/api/removecart`;
      const cart_res = await fetch(cartSql, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: isExistProduct.id, field: "id" }),
      });
      const res = await cart_res.json();
      getAllCartBycustomer();
      alert("Removed from cart.");
      setIsExistProduct("");
      return false;
    }
    selectedProduct.customerId = CUSTOMER_ID;
    const apiUrlEndpoint = `${apiUrl}/api/addtocart`;
    const response = await fetch(apiUrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProduct),
    });
    const res = await response.json();
    if (res.id) {
      alert("added to cart");
      getAllCartBycustomer();
    }
  };
  const handleCalculate = (e) => {
    const quantity = e.target.value;
    if (quantity < 1) {
      alert("Not less than one.");
    }

    setQuantity(quantity);
    const total = price * quantity || 0;
    const subTotal = (total / (quantity + TAX_PERCENT / 100)).toFixed(2) || 0;
    setTotalPrice(total);
    setSubTotalPrice(subTotal);
    updateCartQty({
      name: "",
      quantity: quantity,
      id: isExistProduct.id,
      total: total,
    });
  };

  const handleQuantity = (quantity, type) => {
    let newQuantity = 0;
    if (type === "-") {
      newQuantity = quantity - 1;
      if (newQuantity < 1) {
        alert("Not less than one.");
      }
    } else {
      newQuantity = quantity + 1;
    }
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      const total = price * newQuantity || 0;
      const subTotal =
        (total / (newQuantity + TAX_PERCENT / 100)).toFixed(2) || 0;
      setTotalPrice(total);
      setSubTotalPrice(subTotal);
      updateCartQty({
        name: "",
        quantity: newQuantity,
        id: isExistProduct.id,
        total: total,
      });
    }
  };
  return (
    <Box sx={{ marginBlock: 2 }}>
      {/* {sqft && (
            <form onSubmit={handleSubmit}>
               <Stack direction="row" spacing={1} mb={2} alignItems="flex-end">
                  <TextInput
                     type="number"
                     value={inputSqft}
                     onChange={(e) => setInputSqft(e.target.value)}
                     label={`${name} area`}
                  />
                  <Typography component="div" sx={{ fontWeight: 'bold', fontSize: 20, paddingBottom: '5px' }}>
                     Sqft
                  </Typography>
               </Stack>
            </form>
         )} */}

      {isExistProduct && (
        <form>
          <Stack direction="row" spacing={1} mb={2} alignItems="flex-end">
            <Button
              variant="button"
              sx={{
                background: "black",
                color: "white",
                width: "10%",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              type="button"
              onClick={() => handleQuantity(quantity, "-")}
            >
              -
            </Button>
            <TextInput
              type="number"
              value={quantity}
              onChange={(e) => handleCalculate(e)}
              label={`${name} area`}
            />

            <Button
              variant="button"
              sx={{
                marginBottom: 3,
                background: "black",
                color: "white",
                width: "10%",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              type="button"
              onClick={() => handleQuantity(quantity, "+")}
            >
              +
            </Button>

            <Typography
              component="div"
              sx={{ fontWeight: "bold", fontSize: 20, paddingBottom: "5px" }}
            >
              Qty
            </Typography>
          </Stack>
        </form>
      )}
      {/* {showCalc && (
            <> */}
      {isExistProduct && (
        <Stack>
          {/* <Typography component="p" sx={{ fontSize: 13, color: 'grey' }}>
                  #{result.customerSqft} sqft ÷ {sqft}sqft/case = {result.totalCase.toFixed(2)} cases
               </Typography>
               <Typography component="p">- Each case covers {sqft} square feet</Typography>
               <Typography component="p">
                  - So you will need {Math.ceil(result.totalCase)} cases or {Math.ceil(result.totalCase) * sqft} sqft of flooring
                  for this project
               </Typography>
               <Typography component="p">
                  - {Math.ceil(result.totalCase)} cases x {sqft} sqft/case x ${price}/sqft
               </Typography> */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            mt={1}
          >
            <Typography fontSize={22} fontWeight="bold">
              Total
            </Typography>
            <Typography fontSize={22} color="#1565c0" fontWeight="bold">
              {/* ${result.totalPrice.toFixed(2)} */}
              {totalPrice}
            </Typography>
          </Stack>
        </Stack>
      )}
      {/* <Button
                  variant="button"
                  sx={{
                     marginBottom: 3,
                     background: isExistProduct ? 'red' : 'black',
                     color: 'white',
                     width: '100%',
                     '&:hover': {
                        backgroundColor: isExistProduct ? 'red' : 'black',
                     },
                  }}
                  onClick={handleClick}
               >
                  {isExistProduct ? 'Remove from cart' : 'Add To Cart'}
               </Button>
            </>
         )} */}
      {!sqft && (
        <Button
          variant="button"
          sx={{
            marginBottom: 3,
            background: isExistProduct ? "red" : "black",
            color: "white",
            width: "100%",
            "&:hover": {
              backgroundColor: isExistProduct ? "red" : "black",
            },
          }}
          onClick={handleClick}
        >
          {isExistProduct ? "Remove from cart" : "Add To Cart"}
        </Button>
      )}
    </Box>
  );
}
