import express, {
  Express,
  Request,
  Response,
  NextFunction,
} from "express";
import dotenv from "dotenv";
import { getXataClient } from "./xata"; // Import the Xata client
import { resolveProductByID, CustomRequest } from "./middleWares/resolveUserByID";
import { errorHandler } from "./middleWares/customErrorHandlers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const xata = getXataClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Hello! Its working 😁");
});

// POST: Create a product
app.post("/api/products", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, stock, category } = req.body;

    // Fetch all products to find the maximum productId value
    const products = await xata.db.products.getMany();

    // Find the maximum productId value
    const maxProductId = products.length > 0
      ? products.reduce((max, product) => Math.max(max, product.productId ?? 0), 0)
      : 0;
    const newProductId = maxProductId + 1;


    // Insert a new product into the Xata database with the new productId
    const newProduct = await xata.db.products.create({
      productId: newProductId,  // Set the new custom product ID
      name,
      price,
      description,
      stock,
      category,
    });

    // Respond with the created product but only the relevant fields
    const filteredProduct = {
      productId: newProduct.productId,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      stock: newProduct.stock,
      description: newProduct.description
    };

    res.status(201).json({ message: "Product created successfully", data: filteredProduct });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});


// GET: Retrieve all products
app.get(
  "/api/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get all products from Xata
      const products = await xata.db.products.getMany();
      // Map over the events to include only the desired fields
      const filteredProducts = products.map((product) => ({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
      }));

      res.status(200).json(filteredProducts);
    } catch (error) {
      next(error);
    }
  }
);

// GET: Retrieve a specific product by ID using resolveProductByID middleware
app.get("/api/products/:id", resolveProductByID(), (req: CustomRequest, res: Response) => {
  const { product } = req;
  res.status(200).json(product); // Return the filtered product
});


// PUT: Update a product by ID
app.put("/api/products/:id", resolveProductByID(), async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, price, description, stock, category } = req.body;
  const { product } = req;

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  try {
    const updatedProduct = await xata.db.products.update(product.productId, {
      name,
      price,
      description,
      stock,
      category,
    });

    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    next(error);
  }
});

// DELETE: Delete a product by ID
app.delete("/api/products/:id", resolveProductByID(), async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { product } = req;
if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  try {
    await xata.db.products.delete(product.productId);
    res.send("Successfully Deleted");
  } catch (error) {
    next(error);
  }
});

// Use the custom error handler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
