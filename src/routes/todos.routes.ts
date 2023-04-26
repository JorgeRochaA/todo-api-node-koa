import Router from "koa-router";

const router = new Router({
  prefix: "/todos",
});

router.get("/", async (ctx) => {
  ctx.body = "respuesta de todos";
});

export default router;
