import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'

import APIcard from './APIcard'
import PromptForm from './PromptForm'

import './prompts.css'

const reddit = 'https://www.reddit.com/r/WritingPrompts/random.json'

const genre = ['digital-art', 'science-fiction', 'fantasy']
const deviant = 'https://www.deviantart.com/api/v1/oauth2/browse/topic'
const filters = '&with_session=false&mature_content=false'
const request_token_url = 'https://www.deviantart.com/oauth2/token/?grant_type=client_credentials&client_id=15020&client_secret=2b1357ab8f830d96f443bf8fdfe14577'


const Prompts = () => {

    const [text, setText] = useState('')
    const [thumbLink, setThumbLink] = useState('')
    const [fullLink, setFullLink] = useState('')
    const [token, setToken] = useState('')
    const [needToken, setNeedToken] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('access_token')){
            setToken(localStorage.getItem('access_token'))
        }
    }, [])

    const rand = (x) => Math.floor(Math.random() * (x))
    
    useEffect(() => {
        console.log('useEffect that gets triggered when a new access token is received')
        if(needToken){
            localStorage.setItem('access_token', token)
            picturecall()
        }
        // eslint-disable-next-line
    }, [token, needToken])

    const getToken = () => {
        axios.get(request_token_url)
        .then(res => {
                            setToken(res.data.access_token) 
                            setNeedToken(true)                         
                            console.log('what? its actually happening!?')                            
                         })
        .catch(error => console.log(error))

    }
 
    const picturecall = () => {
        // console.log(token)
        setText('')
        setFullLink('filler words man. this is needed :/ ')

        if(token === ''){
            getToken()

        } else{
            const index = rand(genre.length)
            // console.log(genre[index])
            axios.get(`${deviant}?topic=${genre[index]}&offset=${genre[index] === 'digital-art' ? rand(820) : rand(999)}&limit=1&${filters}&access_token=${token}`)
            .then(res => {
                // console.log(token)
                
                console.log(res)
                console.log(res.data?.results[0]?.category)
                if(res.data?.results[0]?.category !== 'Visual Art'){
                    // IF it isn't an image, call again
                    picturecall()
                } else {
                    setThumbLink(res.data?.results[0]?.thumbs[1]?.src)
                    setFullLink(res.data?.results[0]?.preview?.src)
                }
            })
            .catch(error => {
                                if(error.response?.request?.status === 401){
                                                                             localStorage.removeItem('access_token')
                                                                             getToken()
                                } else{console.log(error)}
                            }
                  )
        }
    }

    const writtencall = () => {
        axios.get(reddit)
        .then((res) => {
            console.log(res.data[0].data.children[0].data.title.substring(4))
            setText(res.data[0].data.children[0].data.title.substring(4))
        })
        .catch((error) => console.log(error))
    }

    return(
        <div>
            <div className="full-wrapper">
                <h1 className="prompt-generator-title">Prompt Generator</h1>
                <p>Pick a writing prompt or a picture prompt</p>  
                <Link to="/usedprompts"><Button size="large" variant="outlined" >Check Prompts Taken</Button></Link>             
            </div>

                <div className="prompt-wrapper">
                    
                        <div className="btn-and-card">
                                <APIcard thumbLink={thumbLink} fullLink={fullLink} text={text} />
                                <div className="prompt-button-div">                
                                    <Button size="large" variant="outlined" onClick={picturecall}>Picture Prompt</Button>
                                    <Button size="large" variant="outlined" onClick={writtencall}>Written Prompt</Button>                   
                                </div> 
                        </div>     

                        <div><PromptForm thumbLink={thumbLink} fullLink={fullLink} text={text} /></div>
                </div>
              
        </div>

    )
}

export default Prompts
