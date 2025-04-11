import express from "express";
import cookieParser from "cookie-parser";

import { PORT, INT } from "./config.js";

import { apiRouter } from "./routes/apiRouter.js";
import { adminRouter } from "./routes/adminRouter.js";

// Middlewares
import { jwt } from "./middlewares/jwt.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cookieParser());
app.use(jwt);

app.use("/api", apiRouter);

app.use("/admin", adminRouter)

app.listen(PORT, INT, () => {
  console.log("Server listening on ", INT, PORT);
});
