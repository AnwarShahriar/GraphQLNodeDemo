require('dotenv').load() // Load environment varialbles

const express = require('express')
const gqlMiddleWare = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('connected to db'))

app.use('/graphql', gqlMiddleWare({
    schema: schema,
    graphiql: true
}))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening to port: ${port}`))
