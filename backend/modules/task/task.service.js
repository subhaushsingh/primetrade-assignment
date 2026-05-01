import Task from "./task.model.js";
import { AppError } from "../../utils/AppError.js";

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const getAllTasks = async (userId, userRole) => {
  const query = userRole === "admin" ? {} : { createdBy: userId };
  return await Task.find(query).populate("createdBy", "email role");
};

export const deleteTask = async (taskId, userId, userRole) => {
  const task = await Task.findById(taskId);

  if (!task) throw AppError.notFound("Task not found");

  if (userRole !== "admin" && task.createdBy.toString() !== userId.toString()) {
    throw AppError.forbidden("You don't have permission to delete this");
  }

  return await Task.findByIdAndDelete(taskId);
};