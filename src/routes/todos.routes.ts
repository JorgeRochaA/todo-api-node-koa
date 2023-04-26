import Router from "koa-router";
import { createTodo } from "../controllers/todos.controller";

const router = new Router({
  prefix: "/todos",
});

router.get("/", createTodo);

export default router;
