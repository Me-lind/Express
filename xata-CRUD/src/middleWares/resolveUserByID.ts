// resolveUserByID.ts (resolveProductByID Middleware)
import { NextFunction, Response, Request } from "express";
import { getXataClient } from "../xata";

// Extend Request object to include product
interface CustomRequest extends Request {
  product?: {
    productId: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
  }
}

// Create Xata client instance
const xata = getXataClient();

const resolveProductByID = () => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const parsedID = parseInt(id)

    try {
      const product = await xata.db.products.read(id); // Fetch product by ID

      if (!product) {
        res.status(404).json({
          message: "Product not found",
        });
        return
      }
      // Filter only the required fields
      const filteredProduct = {
        productId: product.productId ?? 0,
        name: product.name ?? 'N/A',
        category: product.category ?? 'N/A',
        price: product.price ?? 0,
        stock: product.stock ?? 0,
        description: product.description ?? 'N/A',
      };

      // Attach the filtered product to the request object
      req.product = filteredProduct;
      next(); // Pass control to the next middleware/handler
    } catch (error) {
      next(error);
    }
  };
};

export { resolveProductByID, CustomRequest };
