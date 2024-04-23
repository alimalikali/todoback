const Todo = require("../models/todosModels");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getAllTodos = catchAsync(async (req, res ,next) => {
  const user_id = req.user._id
  const todos = await Todo.find({user_id}).sort({createdAt: -1});
  res.status(200).json({
    status: "success",
    length: todos.length,
    body: {
      todos,
    },
  });
});
const getTodo = catchAsync(async (req, res ,next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new AppError("no such workout", 404);
  }
  const todo = await Todo.find({ _id: id });
  res.status(200).json({
    status: "success",
    todo,
  });
});
const createTodo = catchAsync(async (req, res ,next) => {
  const { title } = req.body;
  const user_id = req.user._id;
  const todo = await Todo.create({ title,user_id });

  res.status(201).json({
    status: "sucessfully created",
    todo,
  });
});
const updateTodo = catchAsync(async (req, res ,next) => {
    const { id: _id } = req.params;
    const { title } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(_id,{ title },{ new: true });
    res.status(200).json({
      status: "sucessfully updated",
      updatedTodo,
    });
 
});
const deleteTodo = catchAsync(async (req, res ,next) => {
    const { id: _id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(_id);
    res.status(200).json({
      status: "deleted successfully",
      deleteTodo,
    });

});

module.exports = { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
