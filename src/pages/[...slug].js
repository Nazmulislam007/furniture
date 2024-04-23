import { apiUrl } from "@/Context/constant";
import { getProductByCategory } from "@/Context/utility";
import PageContent from "@/layouts/PageContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function index() {
  const [products, setProducts] = useState([]);
  const [pathname, setPathname] = useState("");
  const router = useRouter();

  async function getPathName() {
    if (router.query.slug) {
      const url = `${apiUrl}/api/getLandingpageId?customer_id=${router.query.slug?.[1]}`;
      const res = await fetch(url);
      const data = await res.json();
      setPathname(data[0]?.landingpage_id);
      return data[0]?.landingpage_id;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const pathname = await getPathName();
      const products = await getProductByCategory();
      const content =
        products.length > 0
          ? products.filter((product) => product.url === pathname)
          : [];
      setProducts(content);
    }
    fetchData();
  }, [router]);

  return (
    products.length > 0 &&
    pathname.length > 0 && (
      <PageContent products={products} pathname={pathname} />
    )
  );
}
