import React from 'react'
import { Container, Paper } from '@material-ui/core'

import { Link } from 'react-router-dom'
import axios from 'axios'

import './displaypromptcard.css'
import heart from '../../../Images/heart.png'
import edit from '../../../Images/edit.png'
import trash from '../../../Images/delete.png'
import useStyles from '../../styles.js'

const url = "http://localhost:5000"

const DisplayPromptCard = ({ title, prose, id, genre, like, thumbLink, fullLink, text, callback }) => {
    const classes = useStyles()   
    const genre_string = (genre[0] === '' ? '' : '#') + (genre.join(' #'))
    
    const prompt = text.split(' ').slice(0,5).join(' ')
    const deletePrompt = () => {

        axios.delete(`${url}/${id}/prompt/deleteprose`)
        .then((res) => {
            callback(id)
            console.log('Suxccessfully deleted')
        })
        .catch((error) => console.log(error))
    }

    return(
        <>
          <div className="used-prompts-wrapper">
                <Container className={classes.paper}>
                    <Paper>

                        {   text !== '' ? <h2 className="used-written-prompt">{prompt}</h2>
                                     :<img src={thumbLink} alt="fuckoff" className="used-thumbnail"/> 
                        }

                        <div className="text-meta-data">
                            <div><h3>{title}</h3></div>
                            <div className="used-story">{prose}</div>
                            <div className="used-genres">{genre_string }</div>
                        

                            <div className="love-and-edit">

                                <img src={heart} alt="idgafaalt"className="heart" />                               
                                <div className="prompt-like-counter">{like}</div>
                                <Link to = {{
                                        pathname: "/prompts",
                                        state: { 
                                                    title, prose, id, genre, thumbLink, fullLink, text, hash: 'box'
                                        }}}><img src={edit} alt="idgafaalt" className="prompt-edit-btn" /></Link>
                                <img src={trash} alt="idgafaalt" className="prompt-trash-btn" onClick={deletePrompt}/>
                            </div>
                        </div>
                     </Paper>
                 </Container>
          </div>
        </>
    )
}

export default DisplayPromptCard 

