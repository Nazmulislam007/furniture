import productApi from "@/Context/ProductInfoProvider/Api/productApi";
import { getProductByCategory } from "@/Context/utility";
import PageContent from "@/layouts/PageContent";

export const getStaticPaths = async () => {
  const keys = Object.keys(productApi);
  const paths = keys.map((page) => ({ params: { page } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const pathname = params.page;
  const products = await getProductByCategory();
  const content =
    products.length > 0
      ? products.filter((product) => product.url === pathname)
      : [];
  return {
    props: {
      content,
      pathname,
    },
  };
};

export default function Hellos({ content, pathname }) {
  if (content.length > 0) {
    return <PageContent products={content} pathname={pathname} />;
  }
  return false;
}
