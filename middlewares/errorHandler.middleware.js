import { AppError } from "../utils/AppError.js"

export const errorHandler = (err, req, res, next) => {

  //  operational error 
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details && { details: err.details })
    })
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`
    })
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    })
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired"
    })
  }

  // Unknown crash
  console.error("UNHANDLED ERROR:", err)
  return res.status(500).json({
    success: false,
    message: "Something went wrong"
  })
}