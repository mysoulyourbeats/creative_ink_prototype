import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './routes/routes.js'
import { Server }  from 'socket.io'
import http from 'http'

const app = express()
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

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

let superSet = []
io.on('connection', (socket) => {

    console.log('socket born')        

    // Signal received that game has started, so initilization of writer's data is done here
    socket.on('startWriting', ({ room, maxRoundRobins, penName }) => {
        io.to(room).emit('nextWriterPenName', { penName })
        io.to(socket.id).emit('yourTurn')
        const writerArrayOfRoom = [...io.of("/").adapter.rooms.get(room)]
        superSet.push({ room, writerArrayOfRoom, ptr: 0, maxRoundRobins })
    })

    // Next turn
    socket.on('nextWriter', ({ room }) => {
        let obj = superSet[superSet.findIndex((val) => val.room === room)]

        if(obj.maxRoundRobins === 0){
            io.to(obj.room).emit('timeIsUp')
        }

        else {
            obj.maxRoundRobins = obj.maxRoundRobins - 1
            obj.ptr = (1 + obj.ptr)%(obj.writerArrayOfRoom.length)
            // console.log(io.sockets.sockets.get(obj.writerArrayOfRoom[obj.ptr]))
            io.to(obj.room).emit('nextWriterPenName', { penName: io.sockets.sockets.get(obj.writerArrayOfRoom[obj.ptr])?.name })
            // Notify to the next writer
            console.log(obj.writerArrayOfRoom[obj.ptr])
            io.to(obj.writerArrayOfRoom[obj.ptr]).emit('yourTurn')
        }
    })


    // Subscribe User
    socket.on('join', ({ name, room }, callback) => {

        socket.name = name //adding nickname to that specific socket object
        socket.join(room)
        
        socket.broadcast.to(room).emit('newJoinedMember', { userSocketId: socket.id, name })
        const allSocketIdsInRoom = [...io.of("/").adapter.rooms.get(room)] // getting all socket Ids of a room
        let otherMembers = []
        // mapping Ids to their nicknames
        allSocketIdsInRoom.map((val) => otherMembers.push({ userSocketId: val, name: io.sockets.sockets.get(val).name }))
        callback({
            otherMembers, roomSize: otherMembers.length
        })

    })    

    // Broadcast message to OTHERS in the room
    socket.on('userProse', ({ userProse, randomColor, room }) => {        
        socket.broadcast.to(room).emit('friendProse', { friendProse: userProse, randomColor })
        
    })

    // Disconnecting socket
    socket.on('disconnecting', () => {
        const room = [...socket.rooms][1] // get his room name
        let index = superSet.findIndex((val) => val.room === room)
        if(index!== -1){
            let obj = superSet[index]

            let userIndex = obj.writerArrayOfRoom.findIndex((val) => val === socket.id)
            if(userIndex !== -1)  obj.writerArrayOfRoom.splice(userIndex, 1)
            if(obj.ptr === obj.writerArrayOfRoom.length)  obj.ptr = 0                    
        }

        io.to(room).emit('writerLeft', ({ userSocketId: socket.id }))
    })

    // Disconnect Socket
    socket.on('disconnect', () => {
        console.log('socket died')    
    })
})


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(server.listen(PORT, () => console.log(`Server is running on ${PORT}`)))
                .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
