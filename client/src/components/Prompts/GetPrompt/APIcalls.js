import React, { useState } from 'react'
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
// const request_token_url = 'https://www.deviantart.com/oauth2/token/?grant_type=client_credentials&client_id=15020&client_secret=2b1357ab8f830d96f443bf8fdfe14577'

// 28b756bc081ec4ce9bb5f27a78b2f7f8dc3c5271084c1238af
const Prompts = () => {

    const [text, setText] = useState('')
    const [thumbLink, setThumbLink] = useState('')
    const [fullLink, setFullLink] = useState('')
    const [token, setToken] = useState('37a34f5fad01d0d77810327c5a772d416db0cb8c8280b8649b')

    const rand = (x) => Math.floor(Math.random() * (x))    
    const getToken = () => {
        // axios.get(request_token_url)
        //             .then(res => {
                        // setToken(res.data.access_token)
                        setToken('28b756bc081ec4ce9bb5f27a78b2f7f8dc3c5271084c1238af')
                        console.log('what? its actually happening!?')
                        picturecall()
                    //  })
                    // .catch(error => console.log(error))
    }

    const picturecall = () => {
        setText('')
        if(token === '')
            getToken()
        
        else{
            const index = rand(genre.length)
            console.log(genre[index])
            axios.get(`${deviant}?topic=${genre[index]}&offset=${rand(999)}&limit=1&${filters}&access_token=${token}`)
            .then(res => {
                // console.log(token)
                console.log(res)
                setThumbLink(res.data?.results[0]?.thumbs[1]?.src)
                setFullLink(res.data?.results[0]?.preview?.src)
            })
            .catch(error => (error.response?.request?.status === 401) ? getToken() : console.log(error))
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
            <div className="prompt-button-div">
                <Button className="widther" color="primary" variant="contained" onClick={picturecall}>picture prompt</Button>
                <Button className="widther" color="secondary" variant="contained" onClick={writtencall}>written prompt</Button>
                <Link to="/usedprompts">
                    <Button className="widther" color="primary" variant="contained">Prompts taken</Button>
                </Link>
            </div>

                <div className="img-form-wrapper">
                    <APIcard thumbLink={thumbLink} fullLink={fullLink} text={text} />               
                    <div className="prompt-form-wrapper"><PromptForm thumbLink={thumbLink} fullLink={fullLink} text={text} /></div>
                </div>
        </div>
    )
}

export default Prompts

// const getToken = () => {
    // axios.get(request_token_url)
    //             .then(res => {
                    // setToken(res.data.access_token)
                    // picturecall()
                //  })
                // .catch(error => console.log(error))
// }