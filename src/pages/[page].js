import { getCabinets, getProductByCategory } from "@/Context/utility";
import CabinetContent from "@/layouts/CabinetContent";
import PageContent from "@/layouts/PageContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const pathname = router.query.page;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      if (pathname === "cabinets") {
        const data = await getCabinets();
        setProducts(data);
      } else {
        const data = await getProductByCategory();
        setProducts(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, [pathname]);

  let content = null;

  if (loading) content = <div>loading...</div>;

  if (!loading && products?.length === 0)
    content = <div>Something went wrong! please try again.</div>;

  if (products?.length > 0 && !loading) {
    const prods = products.filter((product) => product.url === pathname);

    content =
      pathname === "cabinets" ? (
        <CabinetContent products={products} pathname={pathname} />
      ) : (
        <PageContent products={prods} pathname={pathname} />
      );
  }

  return content;
}
