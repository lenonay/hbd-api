import express from "express";

import { adminAuth } from "../middlewares/auhtorization.js";

export const adminRouter = express.Router();

adminRouter.use("/public", express.static("./public"));

adminRouter.get("/", (req, res) => {
  if (req.session) {
    if (req.session.rol == "admin" || req.session.rol == "duke") {
      res.redirect("/admin/panel");
      return;
    }
  }

  res.sendFile("login.html", { root: "./views" });
});

// Protegemos las rutas
adminRouter.use(adminAuth);

adminRouter.get("/panel", (req, res) => {
  console.log("Acceso al panel");

  res.sendFile("panel.html", { root: "./views" });
});
