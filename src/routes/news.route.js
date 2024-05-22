import express from 'express'
import { create, update, deleteById, findAll, topNews, findById, findByTitle, findByUser } from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
const route = express.Router()

route.post('/', authMiddleware, create)
route.get('/', findAll)
route.get('/byUser', authMiddleware, findByUser)
route.get('/top', topNews)
route.get('/search', findByTitle)
route.delete('/:id', authMiddleware, deleteById)

route.patch('/:id', authMiddleware, update)
route.get('/:id', authMiddleware, findById)

export default route