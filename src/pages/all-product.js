// import productApi from '@/Context/ProductInfoProvider/Api/productApi';
import { useSeletedProduct } from "@/Context/ProductInfoProvider/ProductInfoProvider";
import {
	getCategory,
	getMyPrice,
	getProductByCategory,
	insertMyPrice,
} from "@/Context/utility";
import AllProductList from "@/components/AllProduct/AllProductList";
import FilterOptions from "@/components/AllProduct/FilterOptions";
import MyProductList from "@/components/AllProduct/MyProductList";
import SelectDropDown from "@/components/SelectDropDown";
import TextInput from "@/components/TextInput";
import {
	Box,
	Button,
	MenuItem,
	MenuList,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// const CUSTOMER_ID = 23;

export default function AllProduct() {
	const { setIsUpdatedMyPrice } = useSeletedProduct();
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState("vanities");
	// const catagory = Object.keys(productApi);
	const [productApi, setProductApi] = useState([]);
	const [catagory, setCatagory] = useState([]);
	const [myPrice, setMyPrice] = useState({ price: 0, sign: "$" });
	const [userData, setUserData] = useState({});
	const [productId, setProductId] = useState("");
	const CUSTOMER_ID = userData?.customer_id;

	useEffect(() => {
		const userData =
			typeof window !== "undefined"
				? JSON.parse(window.sessionStorage.getItem("user"))
				: null;
		setUserData(userData);
		getAllProducts();
		// getMyPriceBytype();
	}, [selected]);

	const getMyPriceBytype = async () => {
		if (CUSTOMER_ID) {
			setMyPrice(await getMyPrice({ CUSTOMER_ID, selected }));
		}
	};

	const getAllProducts = async () => {
		const category = await getCategory();
		const newArr = [];
		category.filter((x) => {
			return newArr.push(x.url);
		});
		setCatagory(newArr);
		const products = await getProductByCategory();
		const cate = {};
		newArr.map((elem) => {
			cate[elem] = products.filter((z) => z.url === elem);
		});
		setProductApi(cate);
	};
	// const myPrice = addtoCart[CUSTOMER_ID].myPrice[selected];
	// const [inputVal, setInputVal] = useState({ price: myPrice.price, sign: myPrice.sign || '$' });

	const selectedCatagory = productApi[selected];
	const handleChange = (e) => {
		// setInputVal({ ...inputVal, [e.target.name]: e.target.value });
		setMyPrice({ ...myPrice, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// updateMyprice({ customerId: CUSTOMER_ID, type: selected, ...inputVal });
		const resp = await insertMyPrice({
			customerId: CUSTOMER_ID,
			type: selected,
			...myPrice,
		});

		if (resp.status === 200) {
			setIsUpdatedMyPrice((prev) => prev + 1);
			alert("my price updated");
		}
		/* dispatch({
         type: 'SET_MY_PRICE',
         payload: { customerId: CUSTOMER_ID, type: selected, ...inputVal },
      });
      dispatch({
         type: 'SET_MY_PRICE_ADD_TO_CART',
         payload: { customerId: CUSTOMER_ID, type: selected, ...inputVal },
      }); */
	};
	return (
		<Box maxWidth="lg" marginX="auto" px={1} mb={5} mt={2}>
			<Box sx={{ width: "fit-content", marginInline: "auto" }}>
				<Button
					variant="outlined"
					sx={{ display: { xs: "block", lg: "none" }, marginBottom: 2 }}
					onClick={() => setShow(!show)}
				>
					Catagory
				</Button>

				<Stack
					direction="row"
					gap={2}
					display="flex"
					flexWrap="wrap"
					justifyContent="center"
				>
					<Stack
						bgcolor="white"
						height="fit-content"
						padding={1}
						sx={{
							position: { xs: "absolute", lg: "inherit" },
							display: { xs: show ? "block" : "none", lg: "block" },
							boxShadow: "0 0 60px -6px #d2d2d2",
							zIndex: 10,
							left: 8,
							maxWidth: { sx: 250, lg: "inherit" },
							width: { sx: "100%", lg: "inherit" },
						}}
					>
						<Typography
							component="p"
							fontSize={22}
							padding="10px 10px 0px 10px"
						>
							All Catagory
						</Typography>
						<MenuList>
							{catagory.map((cata, i) => (
								<MenuItem
									key={i}
									onClick={() => {
										setSelected(cata);
										setShow(false);
									}}
								>
									{cata.charAt(0).toUpperCase() + cata.slice(1)}
								</MenuItem>
							))}
						</MenuList>
					</Stack>

					<Stack gap={2} direction={{ md: "row", xs: "column" }}>
						<Stack bgcolor="white" padding={3} width="100%">
							<Stack>
								<FilterOptions products={selectedCatagory} />
							</Stack>
							<AllProductList
								setProductId={setProductId}
								products={selectedCatagory}
								selected={selected}
							/>
						</Stack>
						<Stack bgcolor="white" padding={3} width="100%">
							<Stack>
								<Typography component="p" fontSize={18} mb={1}>
									When I add new product, increase price by
								</Typography>
								<Stack direction="row" gap="10px" justifyContent="center">
									<Stack component="form" width={50}>
										<TextInput
											value={myPrice?.price}
											name="price"
											onChange={handleChange}
										/>
									</Stack>
									<SelectDropDown
										menuItems={["$", "%"]}
										name="sign"
										value={myPrice?.sign || "$"}
										onChange={handleChange}
									/>
									<Button
										onClick={(e) => handleSubmit(e)}
										variant="contained"
										color="success"
										sx={{ minWidth: 10, padding: "8px" }}
									>
										SET
									</Button>
								</Stack>
							</Stack>
							<MyProductList
								setProductId={setProductId}
								setMyPrice={setMyPrice}
								productId={productId}
								selected={selected}
							/>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
}
