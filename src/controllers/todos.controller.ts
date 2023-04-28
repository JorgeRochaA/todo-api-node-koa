import { Context } from "koa";
import { Todos } from "../entities/Todos";

export const createTodo = async (ctx: Context) => {
  //const { title, priority_index } = ctx.request.body;
  try {
    const lastIndex = (await Todos.count()) + 1;
    let todo = await Todos.create({
      title: `Tarea #${lastIndex}`,
      priority_index: lastIndex,
      description: `(#${lastIndex})Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl`,
    }).save();

    ctx.response.status = 200;
    ctx.body = { message: "Todo created successfully", todo };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error creating todo" };
  }
};

export const getTodos = async (ctx: Context) => {
  let todos;
  if (castToBoolean(ctx.query.completed) !== undefined) {
    todos = await Todos.find({
      where: { completed: castToBoolean(ctx.query.completed) },
    });
  } else {
    todos = await Todos.find();
  }

  ctx.response.status = 200;
  ctx.body = { todos };
};

const castToBoolean = (query: any) => {
  if (query === "true") {
    return true;
  } else if (query === "false") {
    return false;
  } else {
    return undefined;
  }
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

    todo.title = `Tarea Actualizada #${todo.id}`;
    todo.completed = true;
    todo.description = `Descripcion Actualizada (#${todo.id})Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl`;

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

    const todoId = todo.id;

    await todo.remove();

    ctx.response.status = 200;
    ctx.body = { message: "Todo deleted successfully", id: todoId };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error deleting todo" };
  }
};
