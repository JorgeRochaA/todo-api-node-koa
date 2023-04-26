import { Context } from "koa";
import { Todos } from "../entities/Todos";

export const createTodo = async (ctx: Context) => {
  //const { title, priority_index } = ctx.request.body;
  try {
    const lastIndex = (await Todos.count()) + 1;
    await Todos.create({
      title: `Tarea #${lastIndex}`,
      priority_index: lastIndex,
    }).save();

    ctx.response.status = 200;
    ctx.body = { message: "Todo created successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error creating todo" };
  }
};

export const getTodos = async (ctx: Context) => {
  let todos;

  if (ctx.params.boolean) {
    todos = await Todos.find({
      where: { completed: ctx.params.boolean },
    });
  } else {
    todos = await Todos.find();
  }

  ctx.response.status = 200;
  ctx.body = { todos };
};

export const getTodo = async (ctx: Context) => {
  try {
    const todo = await Todos.findOne({ where: { id: ctx.params.id } });

    if (!todo) {
      ctx.status = 404;
      ctx.body = { message: "Todo not found" };
      return;
    }

    ctx.response.status = 200;
    ctx.body = { todo };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error getting todo" };
  }
};

export const updateTodo = async (ctx: Context) => {
  try {
    const todo = await Todos.findOne({ where: { id: ctx.params.id } });

    if (!todo) {
      ctx.status = 404;
      ctx.body = { message: "Todo not found" };
      return;
    }

    const lastIndex = (await Todos.count()) + 1;

    todo.title = `Tarea Actualizada #${lastIndex}`;
    todo.completed = true;

    await todo.save();

    ctx.response.status = 200;
    ctx.body = { message: "Todo updated successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error updating todo" };
  }
};

export const deleteTodo = async (ctx: Context) => {
  try {
    const todo = await Todos.findOne({ where: { id: ctx.params.id } });

    if (!todo) {
      ctx.status = 404;
      ctx.body = { message: "Todo not found" };
      return;
    }

    await todo.remove();

    ctx.response.status = 200;
    ctx.body = { message: "Todo deleted successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error deleting todo" };
  }
};
