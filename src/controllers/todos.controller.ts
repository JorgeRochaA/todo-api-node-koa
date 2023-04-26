import { Context } from "koa";

export const createTodo = async (ctx: Context) => {
  ctx.body = "Hello World";
};
