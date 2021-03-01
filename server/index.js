import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './routes/routes.js'

const app = express()
// app.use(cors())
app.use(cors({
                credentials: true, 
                origin: 'http://localhost:3000'
            })
       )
app.use(cookieParser())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}))
app.use('', router)

const PORT = process.env.PORT || 5000
const CONNECTION_URL = "mongodb+srv://hoshizora:carnival@creativeink.gpwzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))
                .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)