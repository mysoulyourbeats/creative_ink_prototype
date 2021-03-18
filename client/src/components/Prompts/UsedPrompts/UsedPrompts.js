import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import DisplayPromptCard  from './DisplayPromptCard'
import axios from 'axios'
import './displaypromptcard.css'

const UsedPrompts = () => {
    const [promptData, setPromptData] = useState([])
    
    // eslint-disable-next-line
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
        const id = localStorage.getItem('userId')
        axios.get(`http://localhost:5000/${id}/prompt/getprose`)
        .then(res => {
            console.log(res.data.result)      
            res.data.result.map((val) => (
                setPromptData((prev) => [...prev, { title: val.title, prose: val.prose, id: val._id, genre: val.genre, like: val.like.count, 
                                                    thumbLink: val.thumbLink, fullLink: val.fullLink, text: val.text, isLiked: val.isLiked }])
                            ))     
        })
        .catch(err => console.log(err)) 
    },[])
    
    return(
        <div className="display-prompt-container">
            { promptData.length === 0 ? 
                    <div className="oopsie">
                        <div><h2>No prompts <br/>taken yet!</h2></div>
                        <Link to="/prompts"><Button size="large" variant="outlined" className="oopsie-btn">Take a prompt</Button></Link>
                    </div>
                     :                
                    promptData.map((val) =>  (
                                                <DisplayPromptCard 
                                                    title={val.title} prose={val.prose} key={val.id} id={val.id} genre={val.genre} like={val.like} 
                                                    thumbLink={val.thumbLink} fullLink={val.fullLink} 
                                                    text={val.text} callback={callback}
                                                    isLiked={val.isLiked}
                                                />                                            
                                            )
                                )
                
                
            }
        </div>
    )
}

export default UsedPrompts