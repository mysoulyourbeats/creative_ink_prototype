import React, { useEffect, useState } from 'react'
import { Container, Paper, TextField, Button } from '@material-ui/core'
import queryString from 'query-string'
import io from 'socket.io-client'

import './weave.css'

const url = 'http://localhost:5000'
let socket
let index = -1
const Weave = ( {location} ) => {

    const { name, room } = queryString.parse(location.search)
    const totalTime = 20*9 // OR, 180 s === 3 minutes
    const oneWriterTime = 20
    const maxRoundRobins = totalTime/oneWriterTime

    const [randomColor, setRandomColor] = useState('')
    const [userProse, setUserProse] =  useState('')
    const [friendProse, setFriendProse] = useState('')
    const [timeLeft, setTimeLeft] = useState(null)
    const [formText, setFormText] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [writerNamesArray, setWriterNamesArray] = useState([])
    const [spanArray, setSpanArray] = useState([])

    const startWriting = () => {
        socket.emit('startWriting', { room, maxRoundRobins, penName: name })
    }

    const changeProse = (event) => {    

        setSpanArray(((prev) => prev.map((val) => val.keyPropId === index? {...val, userProse: event.target.value} : val )))
        setFormText(event.target.value)
        setUserProse(friendProse + event.target.value)
        socket.emit('userProse', { userProse: friendProse + event.target.value, randomColor, room })
    }

    useEffect(() => {

        document.getElementById('weave-field').disabled = true
        setRandomColor('#' + Math.floor(Math.random()*16777215).toString(16))
        socket = io(url)

        // socket.on('connect', () => {
        //     // console.log('my socket id is', socket.id)
        // })

        socket.emit('join', { name, room }, (res) => {      
            setIsAdmin(res.roomSize === 1? true : false)
            res.otherMembers.map((val) => setWriterNamesArray((prev) => [...prev, val]))
        })

        socket.on('friendProse', ({friendProse, randomColor}) => {            
            setSpanArray(((prev) => prev.map((val) => val.keyPropId === index? {...val, userProse: friendProse} : val )))
            
            // setSpanArray((prev) => console.log('prev is', prev))
            setUserProse(friendProse)
            setFriendProse(friendProse)
            setRandomColor(randomColor)
        })
        
        socket.on('newJoinedMember', ({ userSocketId, name }) => {
            setWriterNamesArray((prev) => [...prev, { userSocketId, name }])
        })

        // Remove that mofo
        socket.on('writerLeft', ({ userSocketId }) => {
            setWriterNamesArray((prev) => prev.filter(item => item.userSocketId !== userSocketId))
        })


        // 'your turn event'
        socket.on('yourTurn', () => {
            console.log('my turn, my turn!')
            document.getElementById('weave-field').disabled = false                
            setTimeLeft(oneWriterTime)
        })

        socket.on('nextWriterPenName', ({ penName }) => {
            setSpanArray((prev) => [...prev, { keyPropId: ++index, penName, userProse: '' } ])
        })

        return () => {   
            socket.disconnect()
        }

    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(timeLeft === 0){
            socket.emit('nextWriter', { room })
            document.getElementById('weave-field').disabled = true
            setTimeLeft(null) 
            setFormText('')                               
        }

        if(!timeLeft) return
        
        const intervalId = setInterval(() => {
                  setTimeLeft(timeLeft - 1)
            }, 1000)
        
        return () => clearInterval(intervalId)
    //eslint-disable-next-line
    }, [timeLeft])    


    useEffect(() => {
        console.log('span array is', spanArray)
    }, [spanArray])

    return(
        <div className="weave-form">
            <Container>
                <Paper>
                    { spanArray.map((val) => <span>{val.userProse} </span>) }
                    <div>===================</div>
                    <div className="writer-array-wrapper"> { writerNamesArray.map((val) => <div key={val.userSocketId} className="other-writer-names">{val.name}</div> ) }</div>
                    <div className="timer">{timeLeft}</div>
                    <div className="weave-story" style={{color: randomColor}}>{userProse}</div>
                    <TextField id="weave-field" rows={15}  fullWidth name="story" label="Story" onChange={changeProse} value={formText}/>                          
                    {isAdmin? <Button variant="contained" color="secondary" onClick={startWriting}>Admin</Button> : null}
                </Paper>
            </Container>
        </div>
    )
}

export default Weave