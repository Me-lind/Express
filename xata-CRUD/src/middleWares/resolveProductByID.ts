import { NextFunction, Response, Request } from "express";
import { getXataClient } from "../xata";

// Extend Request object to include product
interface CustomRequest extends Request {
  product?: {
    id: string; // Xata's internal ID
    productId: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
  };
}

// Create Xata client instance
const xata = getXataClient();

const resolveProductByID = () => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const products = await xata.db.products.filter("productId", parseInt(id)).getMany();

      if (products.length === 0) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      const product = products[0]; 

      // Attach both Xata's internal ID and filtered fields to the request object
      req.product = {
        id: product.id, // Attach the Xata ID for future use
        productId: product.productId ?? 0,
        name: product.name ?? "N/A",
        category: product.category ?? "N/A",
        price: product.price ?? 0,
        stock: product.stock ?? 0,
        description: product.description ?? "N/A",
      };

      next(); // Pass control to the next middleware/handler
    } catch (error) {
      next(error); // Pass error to the error handler
    }
  };
};

export { resolveProductByID, CustomRequest };
