import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const protect = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(AppError.unauthorized("No token provided, authorization denied"));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(AppError.unauthorized("Token is invalid or has expired"));
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(AppError.forbidden("Access denied: Admins only"));
  }
  next();
};