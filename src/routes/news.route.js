import express from 'express'
import { create, findAll, topNews, findById } from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
const route = express.Router()

route.post('/', authMiddleware, create)
route.get('/', findAll)
route.get('/:id', findById)
route.get('/top', topNews)

export default route