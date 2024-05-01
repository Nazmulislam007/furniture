import { apiUrl } from "@/Context/constant";
import { getProductByCategory } from "@/Context/utility";
import PageContent from "@/layouts/PageContent";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function index() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [pathname, setPathname] = useState("");
	const [canVisitLink, setCanVisitLink] = useState(0);
	const router = useRouter();

	async function getPathName() {
		if (router.query.slug) {
			const url = `${apiUrl}/api/getLandingpageId?customer_id=${router.query.slug?.[1]}`;
			const res = await fetch(url);
			const data = await res.json();
			setPathname(data[0]?.landingpage_id);
			setCanVisitLink(data[0]?.goto);
			return data[0]?.landingpage_id;
		}
	}

	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			try {
				const pathname = await getPathName();
				const products = await getProductByCategory();
				const content =
					products.length > 0
						? products.filter((product) => product.url === pathname)
						: [];
				setProducts(content);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
		fetchData();
	}, [router]);

	let content = null;

	if (loading)
		content = (
			<Box>
				<Typography>Loading...</Typography>
			</Box>
		);

	if (!canVisitLink && !loading)
		content = (
			<Box>
				<Typography fontSize="24px" textAlign="center">
					This page is currently unavailable!
				</Typography>
			</Box>
		);

	if (!loading && canVisitLink && products.length > 0 && pathname.length > 0)
		content = <PageContent products={products} pathname={pathname} />;

	return content;
}
