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


const Prompts = (props) => {

    const [text, setText] = useState('')
    const [thumbLink, setThumbLink] = useState('')
    const [fullLink, setFullLink] = useState('')
    const [token, setToken] = useState('')
    const [needToken, setNeedToken] = useState(false)

    useEffect(() => {
        if(props?.location?.state){
            setText(props.location.state.text)
            setThumbLink(props.location.state.thumbLink)
            setFullLink(props.location.state.fullLink)
        }
    }, [props.location.state])

    const clearPromptGeneratedTextOrLinkCallback = () => {
        setText('')
        setFullLink('')
    }

    useEffect(() => {        
        if(localStorage.getItem('access_token')){
            setToken(localStorage.getItem('access_token'))
        }

        const hash = props?.location?.state?.hash       
        if (hash && document.getElementById(hash)) {
            document.getElementById(hash).scrollIntoView({behavior: "smooth"})
        } else {
            window.scrollTo(0, 0)
        }
    }, [props?.location?.state?.hash])

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
        if(fullLink === '')
           { setText('Your picture is arriving! Please wait a sec :)')}
        else{    
            setText('')
        }

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
                    setText('')
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
        setText('Prompt is arriving!       Please wait a sec :)   ')
        axios.get(reddit)
        .then((res) => {            
            console.log(res.data[0].data.children[0].data.title.substring(4))
            setText(res.data[0].data.children[0].data.title.substring(4))
        })
        .catch((error) => console.log(error))
    }

    return(
        <div  className="boss">
            <div className="prompt-page-title-section">
                <h1 className="prompt-page-title">{props.location.state? 'Update piece' : 'Prompt Generator'}</h1>
                {props.location.state? null : <p>Pick a writing prompt or a picture prompt</p> }
                <Link to="/usedprompts"><Button size="large" variant="outlined">See Prompts Taken</Button></Link>             
            </div>

                    <div className="prompt-wrapper">
                        
                            <div className="btn-and-card">
                                    <APIcard thumbLink={thumbLink} fullLink={fullLink} text={text} />

                                    { props?.location?.state ? 

                                        <div className="prompt-button-div">                                                            
                                        </div> : 
                                        <div className="prompt-button-div">                
                                            <Button size="large" variant="outlined" onClick={picturecall} className="picture-prompt-btn">Picture Prompt</Button>
                                            <Button size="large" variant="outlined" onClick={writtencall}>Written Prompt</Button>                   
                                        </div>
                                    }
                            </div>     
    
                            <div id="box" className="form-ultimatum"><PromptForm id={props?.location?.state?.id} title={props?.location?.state?.title} 
                                                                                 prose={props?.location?.state?.prose} genre={props?.location?.state?.genre}
                                                                                 thumbLink={thumbLink} fullLink={fullLink} text={text} 
                                                                                 clearPromptGeneratedTextOrLinkCallback={clearPromptGeneratedTextOrLinkCallback} 
                                                                     />
                            </div>
                    </div>         
              
        </div>

    )
}

export default Prompts
