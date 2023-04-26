import Router from "koa-router";
import { createTodo, getTodos, getTodo } from "../controllers/todos.controller";

const router = new Router({
  prefix: "/todos",
});

router.post("/create", createTodo);
router.get("/get-all", getTodos);
router.get("/get/:id", getTodo);

export default router;
