import { Router } from "express";
const route = Router()

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

route.use('/', swaggerUi.serve)
route.get('/', swaggerUi.setup(swaggerDocument))

export default route