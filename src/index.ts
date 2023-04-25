import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', (ctx) => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
