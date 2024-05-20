import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middlewares.js'
const route = Router()

import { login } from '../controllers/auth.controller.js'
route.post('/', login)

export default route