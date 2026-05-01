import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../../utils/hash.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  try {
    this.password = await hashPassword(this.password);
  } catch (error) {
    next(error);
  }
});


userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await comparePassword(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;