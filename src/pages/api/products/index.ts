import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lip/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, description, price } = req.body;

    try {
      const result = (await query(
        "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
        [name, description, price]
      )) as ResultSetHeader;

      res
        .status(201)
        .json({
          message: "Product created successfully",
          productId: result.insertId,
        });
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  } else if (req.method === "GET") {
    try {
      const products = await query("SELECT * FROM products");
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
