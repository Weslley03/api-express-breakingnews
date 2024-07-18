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
  removeComment,
  likecheck,
  commentByIdNews
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const route = express.Router();

route.post("/create", authMiddleware, create);
route.get("/getall", findAll);
route.get("/top", topNews);
route.get("/search", findByTitle);
route.get("/byUser", authMiddleware, findByUser);
route.get('/comment/commentbyidnews/:id', commentByIdNews)
route.get('/likecheck/:id', authMiddleware, likecheck) 
route.patch("/comment/:idNews/:commentId", authMiddleware, removeComment);
route.get("/findId/:id", authMiddleware, findById);
route.patch("/upadate/:id", authMiddleware, update);
route.delete("/:id", authMiddleware, deleteById);
route.patch("/like/:id", authMiddleware, likeNews);
route.patch("/comment/:id", authMiddleware, addComment);

export default route;
