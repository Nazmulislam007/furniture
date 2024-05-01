import productApi from '@/Context/ProductInfoProvider/Api/productApi';
import { getProductByCategory } from '@/Context/utility';
import CabinetContent from '@/layouts/CabinetContent';
import PageContent from '@/layouts/PageContent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const pathname = router.query.page;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const data = await getProductByCategory();
      setProducts(data);
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

  if (loading) return <div>loading...</div>;

  if (!loading && products.length === 0) return <div>Something went wrong! please try again.</div>;

  if (products.length > 0 && !loading) {
    const content = products.filter((product) => product.url === pathname);

    return pathname === 'cabinets' ? (
      <CabinetContent products={productApi.cabinets} pathname={pathname} />
    ) : (
      <PageContent products={content} pathname={pathname} />
    );
  }
}
