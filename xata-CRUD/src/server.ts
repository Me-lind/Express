import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleWares/customErrorHandlers";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRoutes); // Use the product routes

app.use(errorHandler); // Error handling middleware

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
