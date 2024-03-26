const express = require('express')
const app = express()
// const port = 3000
const mongoose = require('mongoose')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')


require('dotenv').config()

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to MongoDB established")},
        err => {console.log("Failed to connect to MongoDB", err)}
    )

const cors = require('cors')
app.use(cors({
    origin: '*'
    //['http://localhost:8000/', 'http://www.aueb.gr']
}))

const user = require('./routes/user.route')
const product = require('./routes/product.route')
const userProduct = require('./routes/user.products.routes')

app.use('/', express.static('files'))
app.use('/api/users', user)
app.use('/api/user-products', userProduct)
app.use('/api-docs', 
            swaggerUi.serve, 
            swaggerUi.setup(swaggerDocument.options))


app.use('/api/products' , product)




// app.listen(port, () => {
//     console.log("Server is up")
// })


module.exports = app
