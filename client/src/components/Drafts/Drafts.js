import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProseCard from './ProseCard'
import axios from 'axios'

import './styles.css'
import plus from '../../Images/plus.png'

const url = "http://localhost:5000"


const Drafts = () => {
    const[proseData, setProseData] = useState([])
    const[id, setId] = useState('')

    const callback = (id) => {
            const index = proseData.findIndex((val) => val.id === id)
    
            if(index !== -1) {
               proseData.splice(index, 1) 
               setId(id)   
            }
            else
                console.log('User ID is invalid')
        }

    useEffect(() => {
        const id = localStorage.getItem('userID')

        axios.get(`${url}/${id}/prose/getprose`)
        .then((res) => {
            res.data.result.map((val) => (

                setProseData((prev) => [...prev, { title: val.title, prose: val.prose, id: val._id }])
                            ))
            
            // console.log('Proses obtained')             
        })
        .catch((error) => console.log(error))
    }, [])


    return(
            <div className="drafts-container">  
             <Link to="/postprose"><img src={plus} alt="idgafaalt" className="create-draft-btn" /></Link>
    
                { 
                    proseData.map((val) => (   id!==val.id ?
                                                <ProseCard key={val.id} id={val.id} title={val.title} prose={val.prose} callback={callback}/>
                                                : null
                                            ) 
                                 ) 
                }
            </div>

    )
}

export default Drafts