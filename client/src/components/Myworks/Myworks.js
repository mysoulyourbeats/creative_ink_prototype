import React, { useState } from 'react'
// import ProseCard from './ProseCard'
import axios from 'axios'
const url = "http://localhost:5000"

const Myworks = () => {
    const[proseData, setProseData] = useState('')

    axios.get(`${url}/getprose`, {id: localStorage.getItem('userID')})
    .then((res) => {
        console.log(res.data.result[0].title)
        // setProseData(res.data.result[0])
    })
    .catch((err) => console.log(err))

    return(
        <>  
            {/* <ProseCard title={x} prose={prose}/> */}
            <h1>Hallo </h1>

        </>
    )
}

export default Myworks