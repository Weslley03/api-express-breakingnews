const express = require('express')
const userRoute = require('./src/routes/user.route')
const connetcDatabase = require('./src/database/db')

const app = express()
const port = 3000
connetcDatabase()

app.use(express.json())
app.use('/users', userRoute)

app.listen(port, () => {
    console.log('server running')
})