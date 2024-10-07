import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lip/db";
import { ResultSetHeader } from "mysql2";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  console.log("product Id:", id);

  if (req.method === "GET") {
    try {
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      const result = await query<Product[]>(
        "SELECT * FROM products WHERE id = ?",
        [Number(id)]
      );

      console.log(result);

      if (result.length === 0) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(result[0]);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  } else if (req.method === "PUT") {
    const { name, description, price } = req.body;

    try {
      (await query(
        "UPDATE products set name = ?, description = ?, price = ? where id=?",
        [name, description, price, id]
      )) as ResultSetHeader;

      res.status(200).json({ message: "Product updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      await query("DELETE FROM products where id = ?", [id]);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT","DELETE"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
