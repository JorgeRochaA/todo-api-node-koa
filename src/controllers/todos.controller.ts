import { Context } from "koa";
import { Todos } from "../entities/Todos";

export const createTodo = async (ctx: Context) => {
  //const { title, priority_index } = ctx.request.body;
  const todoCreated = await Todos.create({
    title: "tarea 1",
    priority_index: (await Todos.count()) + 1,
  }).save();

  if (!todoCreated) {
    ctx.throw(500, "Error creating todo");
  }

  ctx.response.status = 200;
  ctx.body = { message: "Todo created successfully" };
};

export const getTodos = async (ctx: Context) => {
  const todos = await Todos.find();
  ctx.response.status = 200;
  ctx.body = { todos };
};

export const getTodo = async (ctx: Context) => {
  const todo = await Todos.findOne({ where: { id: ctx.params.id } });

  if (!todo) {
    ctx.status = 404;
    ctx.body = { message: "Todo not found" };
    return;
  }

  ctx.response.status = 200;
  ctx.body = { todo };
};
