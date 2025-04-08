import express from "express";
import cookieParser from "cookie-parser";

import { PORT, INT, MAIN_URI } from "./config.js";
import { AccountRouter } from "./routes/accountRouter.js";
import { v1Router } from "./routes/v1Router.js";

// Middlewares
import { jwt } from "./middlewares/jwt.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cookieParser());
app.use(jwt);

app.use((req,res, next) => {
  console.log(req.originalUrl, req.method);

  next();
});

app.get("/api", (_, res) => {
  res.redirect(MAIN_URI);
});

app.use("/api/account", AccountRouter);

app.use("/api/v1", v1Router);

app.listen(PORT, INT, () => {
  console.log("Server listening on ", INT, PORT);
});
