import { CustomTableCell } from "@/assets/Custom/tableStyle";
import { apiUrl } from "@/Context/constant";
import { removeToCart } from "@/Context/ProductInfoProvider/actions";
import { useSeletedProduct } from "@/Context/ProductInfoProvider/ProductInfoProvider";
import { getCartBytype, getMyPrice, removeLineItem } from "@/Context/utility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyProductList({
  selected,
  productId,
  setProductId,
  setMyPrice,
}) {
  const [userData, setUserData] = useState({});
  const [myProduct, setMyProduct] = useState([]);
  const { isUpdatedMyPrice, dispatch } = useSeletedProduct();

  const CUSTOMER_ID = userData?.customer_id;
  useEffect(() => {
    const fetchData = async () => {
      const userData =
        typeof window !== "undefined"
          ? JSON.parse(window.sessionStorage.getItem("user"))
          : null;
      setUserData(userData);
      if (CUSTOMER_ID) {
        const myPriceByType = await getMyPrice({ CUSTOMER_ID, selected });
        if (myPriceByType) {
          setMyPrice(myPriceByType);
        } else {
          setMyPrice({ price: 0, sign: "$" });
        }
        await getCartBytype({ CUSTOMER_ID, selected });
        getCartByCustomer(myPriceByType);
      }
    };
    fetchData();
  }, [CUSTOMER_ID, selected, productId, isUpdatedMyPrice]);

  const getCartByCustomer = async (myPriceObj) => {
    const cart = await getCartBytype({ CUSTOMER_ID, selected });
    const newArr = [];
    if (cart) {
      cart?.map((elem) => {
        if (myPriceObj?.sign === "%") {
          elem.myprice =
            (parseFloat(elem?.price) / 100) * parseFloat(myPriceObj?.price);
        } else {
          elem.myprice = parseFloat(myPriceObj?.price);
        }
        newArr.push(elem);
      });
    }
    setMyProduct(newArr);
  };

  const handleRemoveToCart = async (id, category_id) => {
    const cartSql = `${apiUrl}/api/removecart`;
    const cart_res = await fetch(cartSql, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id: id, field: "id" }),
    });
    removeLineItem({ customerId: CUSTOMER_ID, categoryId: category_id });
    const res = await cart_res.json();
    if (res) {
      setProductId(0);
    }
    const listFilter = myProduct.filter((list) => list.id !== id);
    setMyProduct(listFilter);

    dispatch(
      removeToCart({
        customerId: CUSTOMER_ID,
        id,
        type: selected,
      })
    );
  };

  return (
    <Stack>
      {myProduct.length > 0 ? (
        <>
          <Typography component="p" fontSize={22} pt={1} fontWeight="500">
            My {selected}
          </Typography>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CustomTableCell />
                  <CustomTableCell sx={{ fontSize: 13 }}>
                    Vendor Price
                  </CustomTableCell>
                  <CustomTableCell sx={{ fontSize: 13 }}>
                    My Price
                  </CustomTableCell>
                  <CustomTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {myProduct.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <CustomTableCell>
                      <Stack direction="row" spacing={1}>
                        <Image
                          src={product.img}
                          height="60"
                          width="60"
                          alt="img"
                          priority
                        />
                        <Box>
                          <Typography component="p">{product.name}</Typography>
                          <Typography
                            component="p"
                            fontSize={14}
                            lineHeight="11px"
                            color="GrayText"
                          >
                            {product.color}
                          </Typography>
                          <Typography
                            component="p"
                            fontSize={14}
                            color="GrayText"
                          >
                            {product.vendor}
                          </Typography>
                        </Box>
                      </Stack>
                    </CustomTableCell>
                    <CustomTableCell sx={{ fontWeight: 500 }}>
                      ${product.price}
                    </CustomTableCell>
                    <CustomTableCell sx={{ fontWeight: 500 }}>
                      ${product.myprice.toFixed(2)}
                    </CustomTableCell>
                    <CustomTableCell>
                      <Button
                        onClick={() =>
                          handleRemoveToCart(product.id, product.category_id)
                        }
                        variant="contained"
                        color="error"
                        sx={{ minWidth: 10, padding: "8px" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box padding="20px 0" textAlign="center" fontSize="20px">
          Select a product
        </Box>
      )}
    </Stack>
  );
}
