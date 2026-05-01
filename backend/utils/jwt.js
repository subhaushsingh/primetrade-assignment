import jwt from "jsonwebtoken"
import { randomBytes, createHash } from "node:crypto"
import { env } from "../config/env.js"

const SECRET = env.JWT_SECRET;

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: "15m"
  })
}

export const generateRefreshToken = () => {
  return randomBytes(64).toString("hex")
}

export const hashRefreshToken = (token) => {
  return createHash("sha256").update(token).digest("hex")
}

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET)
}