import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { connectDatabase } from './connection';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', (ctx) => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());

// Connect to the database
connectDatabase().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error('Failed to connect to database', err);
});

// ... add routes and middleware here ...

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});