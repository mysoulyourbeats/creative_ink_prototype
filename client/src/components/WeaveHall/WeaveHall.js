import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core' 
import WeaveCard from './WeaveCard'
import './weavehall.css'
import axios from 'axios'

const url = 'http://localhost:5000'

const WeaveHall = () => {

    const [weavedArray, setWeavedArray] = useState([])
    const [isEmptyHall, setIsEmptyHall] = useState(false)

    useEffect(() => {
        axios.get(`${url}/getWeave`)
        .then((res) => {
            console.log(res)
            res.data.result.map((val) => setWeavedArray((prev) => [...prev, { title: val.title, spanArray: val.prose, id: val._id }]))        
        })
        .catch((error) => {setIsEmptyHall(true); console.log(error)})
    }, [])

    return (
        <div>
            {isEmptyHall? <div className="oopsie">
                            <div><h2>No collab stories<br /> weaved yet!</h2></div>
                            <Link to='/join'><Button size="large" variant="outlined" className="oopsie-btn" >Weave your own</Button></Link>                            
            </div> : null}
            <div className="display-prompt-container">{weavedArray.map((val) => <WeaveCard key={val.id} title={val.title} spanArray={val.spanArray} />)}</div>
        </div>
    )
}

export default WeaveHall