const express = require("express");
const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo} = require("../controllers/todosControllers");
const requireAuth  = require("./../middleware/requireAuth");


const router = express.Router();

router.use(requireAuth);

router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
