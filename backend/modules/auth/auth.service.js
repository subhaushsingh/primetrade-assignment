import User from "./auth.model.js";
import { AppError } from "../../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw AppError.conflict("A user with this email already exists");
  }

  const user = await User.create(userData);

  user.password = undefined;

  return user;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw AppError.badRequest("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    throw AppError.unauthorized("Invalid email or password");
  }

  const isCorrect = await user.isPasswordCorrect(password);
  
  if (!isCorrect) {
    throw AppError.unauthorized("Invalid email or password");
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken();

  user.password = undefined;

  return {
    user,
    tokens: {
      accessToken,
      refreshToken
    }
  };
};