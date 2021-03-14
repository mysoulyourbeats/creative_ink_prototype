import React, { useState, useEffect } from 'react'
import DisplayPromptCard  from './DisplayPromptCard'
import axios from 'axios'
import './displaypromptcard.css'

const UsedPrompts = () => {
    const [promptData, setPromptData] = useState([])
    // {title: '', prose: '', id: '', genre: [], like: 0, thumbLink: '', fullLink: '', text: '' }  

    const[id, setId] = useState('')

    const callback = (id) => {
            const index = promptData.findIndex((val) => val.id === id)
    
            if(index !== -1) {
               promptData.splice(index, 1) 
               setId(id)   
            }
            else
                {console.log('User ID is invalid')}
        }
    
    useEffect(() => {
        const id = localStorage.getItem('userID')
        axios.get(`http://localhost:5000/${id}/prompt/getprose`)
        .then(res => {
            // console.log(res.data.result)      
            res.data.result.map((val) => (
                setPromptData((prev) => [...prev, { title: val.title, prose: val.prose, id: val._id, genre: val.genre, like: val.like, thumbLink: val.thumbLink, fullLink: val.fullLink, text: val.text }])
                            ))     
        })
        .catch(err => console.log(err)) 
    },[])

    // console.log(promptData)
    
    return(
        <div className="display-prompt-container">
            {
                promptData.map((val) =>  (
                                            <DisplayPromptCard 
                                                title={val.title} prose={val.prose} key={val.id} id={val.id} genre={val.genre} like={val.like} 
                                                thumbLink={val.thumbLink} fullLink={val.fullLink} text={val.text} callback={callback}
                                            />                                            
                                         )
                              )
            
            }
           
        </div>
    )
}

export default UsedPrompts