import express from "express";
import cookieParser from "cookie-parser";

import { PORT, INT, MAIN_URI } from "./config.js";
import { SuggestionsRouter } from "./routes/suggestionsRouter.js";
import { AccountRouter } from "./routes/accountRouter.js";

// Middlewares
import { jwt } from "./middlewares/jwt.js";
import { authorization } from "./middlewares/auhtorization.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cookieParser());
app.use(jwt);

app.get("/api", (_, res) => {
  res.redirect(MAIN_URI);
});

app.use("/api/account", AccountRouter);

/*
  RUTAS PROTEGIDAS
*/
app.use(authorization);

app.use("/api/suggestions", SuggestionsRouter);

app.listen(PORT, INT, () => {
  console.log("Server listening on ", INT, PORT);
});
