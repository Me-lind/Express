import { Request, Response, NextFunction } from "express";
import { productSchema } from "../validations/productValidation";

export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const validationErrors = error.details.map((detail) => detail.message);
        res.status(400).json({ errors: validationErrors });
    }

    next(); // Proceed if no validation errors
};
