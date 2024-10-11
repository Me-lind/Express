import { RequestHandler } from "express";
import { CustomRequest } from "../middleWares/resolveProductByID";
import { getXataClient } from "../xata";

const xata = getXataClient();

// Handler for creating a product
export const createProduct: RequestHandler = async (req, res, next) => {
    const { name, price, description, stock, category } = req.body;

    try {
        const products = await xata.db.products.getMany();
        const maxProductId = products.reduce((max, product) => Math.max(max, product.productId ?? 0), 0);
        const newProductId = maxProductId + 1;

        const newProduct = await xata.db.products.create({
            productId: newProductId,
            name,
            price,
            description,
            stock,
            category,
        });

        res.status(201).json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
        next(error);
    }
};

// Handler for updating a product
export const updateProduct: RequestHandler = async (req: CustomRequest, res, next) => {
    const { product } = req;
    const { name, price, description, stock, category } = req.body;

    if (!product) {
        res.status(404).json({ message: "Product not found" });
    }
    if( product !== undefined)

    try {
        await xata.db.products.update(product.id, {
            name,
            price,
            description,
            stock,
            category,
        });

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        next(error);
    }
};

// Handler for deleting a product
export const deleteProduct: RequestHandler = async (req: CustomRequest, res, next) => {
    const { product } = req;

    if (!product) {
        res.status(404).json({ message: "Product not found" });
    }
if( product !== undefined)
    try {
        await xata.db.products.delete(product.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Handler for getting a single product
export const getProductById: RequestHandler = (req: CustomRequest, res) => {
    const { product } = req;
    res.status(200).json(product);
};

// Handler for getting all products
export const getAllProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await xata.db.products.getMany();
        const filteredProducts = products.map((product) => ({
            productId: product.productId,
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
        }));

        res.status(200).json(filteredProducts);
    } catch (error) {
        next(error);
    }
};
