import express from "express";
import cookieParser from "cookie-parser";

import { apiRouter } from "./routes/apiRouter.js";
import { PORT, INT } from "./config.js";

// Middlewares
import { jwt } from "./middlewares/jwt.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cookieParser());
app.use(jwt);

app.use("/api", apiRouter);

app.listen(PORT, INT, () => {
  console.log("Server listening on ", INT, PORT);
});
