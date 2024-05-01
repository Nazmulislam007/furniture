import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql =
      "SELECT spree_products.*, categories.url FROM `spree_products` LEFT JOIN `categories` ON spree_products.category_id = categories.id";
    const valueParams = [];
    const data = await query({ query: querySql, values: [valueParams] });
    res.status(200).json({ products: data });
  } catch (error) {
    console.log("error:", error);
  }
}
