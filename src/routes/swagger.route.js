import { Router } from "express";
const route = Router()

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert { type: 'json' }

route.use('/', swaggerUi.serve)
route.get('/', swaggerUi.setup(swaggerDocument))

export default route