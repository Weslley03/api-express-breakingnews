import express from 'express'
import userRoute from './src/routes/user.route.js'
import connetcDatabase from './src/database/db.js'
import dotenv from "dotenv" //chama a blibioteca
dotenv.config() //declara sua configuração para uso

const app = express()
const port = process.env.PORT || 3000
connetcDatabase() //executa a função de conexão ao banco

app.use(express.json())
app.use('/users', userRoute)

app.listen(port, () => {
    console.log('server running')
})