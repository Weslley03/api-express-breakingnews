import express from "express";
import {
  create,
  update,
  deleteById,
  findAll,
  topNews,
  findById,
  findByTitle,
  findByUser,
  likeNews,
  addComment,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const route = express.Router();

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topNews);
route.get("/search", findByTitle);
route.get("/byUser", authMiddleware, findByUser);
route.get("/:id", authMiddleware, findById);
route.patch("/:id", authMiddleware, update);
route.delete("/:id", authMiddleware, deleteById);
route.patch("/like/:id", authMiddleware, likeNews);
route.patch("/comment/:id", authMiddleware, addComment);

export default route;
