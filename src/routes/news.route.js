import express from 'express'
import { create, findAll } from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
const route = express.Router()

route.post('/', authMiddleware, create)
route.get('/', findAll)

export default route