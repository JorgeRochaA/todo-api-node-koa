import Router from "koa-router";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller";

const router = new Router({
  prefix: "/todos",
});

router.post("/create", createTodo);
router.get("/get-all/:boolean?", getTodos);
router.get("/get/:id", getTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
