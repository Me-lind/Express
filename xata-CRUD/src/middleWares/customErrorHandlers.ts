// customErrorHandler.ts
import { Request, Response, NextFunction } from "express";

// Extend the Error interface to include the status code
interface CustomError extends Error {
  status?: number;
}

// Custom error handler middleware
const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.status || 500; // Default to 500 Internal Server Error
  const errorMessage = error.message || "Internal Server Error";

  res.status(statusCode).json({
    status: statusCode,
    message: errorMessage,
  });
  next()
};

export { errorHandler, CustomError };
