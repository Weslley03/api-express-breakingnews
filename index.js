import express from 'express'
import connetcDatabase from './src/database/db.js'
import dotenv from "dotenv" //chama a blibioteca
import cors from 'cors'

//import de toda rota do programa
import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import newsRoute from './src/routes/news.route.js'
import swaggerRoute from './src/routes/swagger.route.js'

const app = express()
app.use(cors({
    origin: 'http://localhost:3001/'
}))
dotenv.config()
const port = process.env.PORT || 3000
    
connetcDatabase() //executa a função de conexão ao banco
app.use(express.json())
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/news', newsRoute)
app.use('/doc', swaggerRoute)

app.listen(port, () => {
    console.log('server running')
})