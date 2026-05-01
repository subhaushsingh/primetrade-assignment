import * as taskService from "./task.service.js";

export const create = async (req, res, next) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      createdBy: req.user.id, 
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.id, req.user.role);
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id, req.user.role);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
