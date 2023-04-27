import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { connectDatabase } from "./connection";
import compose from "koa-compose";
import fs from "fs";
import path from "path";
import cors from "@koa/cors";

const app = new Koa();

app.use(cors());

app.use(bodyParser());

const routesDir = path.join(__dirname, "routes");

const routeFiles = fs.readdirSync(routesDir);

const routers = routeFiles
  .filter((file) => file.endsWith(".ts"))
  .map((file) => require(path.join(routesDir, file)).default);

app.use(compose(routers.map((router) => router.routes())));

// Connect to the database
connectDatabase()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });

// ... add routes and middleware here ...

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
