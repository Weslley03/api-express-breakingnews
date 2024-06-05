import express from 'express'
import userController from '../controllers/user.controller.js'
import{ validId} from '../middlewares/global.middlewares.js'
import{ authMiddleware } from '../middlewares/auth.middlewares.js'

const route = express.Router()

route.post('/create', userController.create)

route.use(authMiddleware)
route.get('/', userController.findAll)

route.use(validId)
route.get('/findById/:id?', userController.findById)
route.patch('/findByIdUpdate/:id?',  userController.update)
route.delete('/findByIdDelete/:id?', userController.remove)

export default route