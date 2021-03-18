import React from 'react'
import axios from 'axios'
import './weave.css'

const url = 'http://localhost:5000'
const Weave = () => {
    axios.get(`${url}/`)
    .then(res => console.log(res))
    .catch(error => console.log(error))
    return(
        <>
            <div className="fuck">d</div>
        </>
    )
}

export default Weave