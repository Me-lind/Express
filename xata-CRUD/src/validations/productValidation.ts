import Joi from "joi";

// Validation schema for creating/updating a product
export const productSchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        "string.base": "Name should be a type of 'text'",
        "string.empty": "Name cannot be an empty field",
        "any.required": "Name is a required field",
    }),

    description: Joi.string().max(200).required().messages({
        "string.base": "Description should be a type of 'text'",
        "string.empty": "Description cannot be an empty field",
        "string.max": "Description should not exceed 200 characters",
        "any.required": "Description is a required field",
    }),

    price: Joi.number().positive().required().messages({
        "number.base": "Price should be a number",
        "number.positive": "Price should be a positive number",
        "any.required": "Price is a required field",
    }),

    stock: Joi.number().integer().positive().required().messages({
        "number.base": "Stock should be a number",
        "number.integer": "Stock should be an integer",
        "number.positive": "Stock should be a positive number",
        "any.required": "Stock is a required field",
    }),

    category: Joi.string().min(1).required().messages({
        "string.base": "Category should be a type of 'text'",
        "string.empty": "Category cannot be an empty field",
        "any.required": "Category is a required field",
    }),
});
