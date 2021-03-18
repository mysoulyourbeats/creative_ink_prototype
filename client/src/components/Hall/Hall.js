import React, { useState, useEffect } from 'react'
import DisplayPromptCard from '../Prompts/UsedPrompts/DisplayPromptCard'
import axios from 'axios'

const url = "http://localhost:5000"
const Hall = () => {
    const [promptData, setPromptData] = useState([])
    
    useEffect(() => {
        axios.get(`${url}/${localStorage.getItem('userId')}/hall/getprose`)
        .then(res => {
            console.log(res)
            res.data.result.map((val) => (
            setPromptData((prev) => [...prev, { title: val.title, prose: val.prose, id: val._id, genre: val.genre, like: val.like.count, thumbLink: val.thumbLink, fullLink: val.fullLink, text: val.text, 
                                                writer: val.writer, isLiked: val.isLiked
                                            }])
                            ))     
        })
        .catch(error => console.log(error))
    }, [])


    return(
        <div className="display-prompt-container">
            {promptData.map((val) =>  (
                                        <DisplayPromptCard title={val.title} prose={val.prose} key={val.id} 
                                                           id={val.id} genre={val.genre} like={val.like} 
                                                           thumbLink={val.thumbLink} fullLink={val.fullLink} 
                                                           text={val.text}
                                                           isHall={true}
                                                           writer={val.writer}
                                                           isLiked={val.isLiked}                                                           
                                        />
                                      )
                            )
            }
        </div>
    )
}

export default Hall