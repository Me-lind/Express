import express, {
  Express,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import dotenv from "dotenv";
import { getXataClient } from "./xata"; // Import the Xata client

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const xata = getXataClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST: Create a product
app.post(
  "/api/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price, description, stock, category } = req.body;

      // Insert a new product into the Xata database
      const newProduct = await xata.db.products.create({
        name,
        price,
        description,
        stock,
        category,
      });

      res
        .status(201)
        .json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
      next(error); // Pass error to the error handler
    }
  }
);

// GET: Retrieve all products
app.get(
  "/api/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get all products from Xata
      const products = await xata.db.products.getMany();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// GET: Retrieve a specific product by ID
// Define handler functions with RequestHandler type
const getProductById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await xata.db.products.read(id); // Use `read` method
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Define other handler functions similarly for update and delete routes
const updateProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, stock, category } = req.body;
  try {
    const updatedProduct = await xata.db.products.update(id, {
      name,
      price,
      description,
      stock,
      category,
    });
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await xata.db.products.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send(); // No content, successful deletion
  } catch (error) {
    next(error);
  }
};

// Use the handler functions
app.get("/api/products/:id", getProductById);
app.put("/api/products/:id", updateProduct);
app.delete("/api/products/:id", deleteProduct);

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
