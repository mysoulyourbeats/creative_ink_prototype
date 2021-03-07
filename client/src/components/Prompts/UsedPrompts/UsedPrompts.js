import React, { useState, useEffect } from 'react'
import DisplayPromptCard  from './DisplayPromptCard'
import axios from 'axios'

const UsedPrompts = () => {
    const [promptData, setPromptData] = useState({title: '', prose: '', id: '', genre: [], like: 0, thumbLink: '', fullLink: '', text: '' })
    
    useEffect(() => {
        const id = localStorage.getItem('userID')
        axios.get(`http://localhost:5000/${id}/prompt/getprose`)
        .then(res => {
            console.log(res) 
            res.data.result.map((val) => (

                setPromptData((prev) => [...prev, { 
                                            title: val.title, prose: val.prose, id: val._id, genre: val.genre, 
                                            thumbLink: val.thumbLink, fullLink: val.fullLink, text: val.text  
                                        }])
                            ))     
        })
        .catch(err => console.log(err)) 
    },[])
    
    return(
        <>
            {
                promptData.map((val) =>  (
                                            <DisplayPromptCard 
                                                title={val.title} prose={val.prose} id={val.id} genre={val.genre} like={val.like} 
                                                thumbLink={val.thumbLink} fullLink={val.fullLink} text={val.text}
                                            />                                            
                                         )
                              )
            
            }
           
        </>
    )
}

export default UsedPrompts