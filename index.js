import express from 'express'
import userRoute from './src/routes/user.route.js'
import connetcDatabase from './src/database/db.js'

const app = express()
const port = 3000
connetcDatabase()

app.use(express.json())
app.use('/users', userRoute)

app.listen(port, () => {
    console.log('server running')
})