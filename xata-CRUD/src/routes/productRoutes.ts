import express from "express"
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController"
import { resolveProductByID } from "../middleWares/resolveProductByID"
import { validateProduct } from "../middleWares/validateProduct"

const router = express.Router();

router.post("/products", createProduct,validateProduct)             
router.get("/products", getAllProducts)        
router.get("/products/:id", resolveProductByID(), getProductById)
router.put("/products/:id", resolveProductByID(), validateProduct, updateProduct) 
router.delete("/products/:id", resolveProductByID(), deleteProduct)

export default router;
