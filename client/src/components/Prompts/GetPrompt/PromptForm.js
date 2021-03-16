import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Container, Grid, Button, Paper, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import useStyles from './styles.js'
import './prompts.css'

import axios from 'axios'
const url = "http://localhost:5000"

const PromptForm = ({id, title, prose, genre, like, thumbLink, fullLink, text, clearPromptGeneratedTextOrLinkCallback}) => {
    const classes = useStyles()  
    const history = useHistory()
    let [genre_string, setGenre_String] = useState('')

    const [isPromptChosen, setIsPromptChosen] = useState('')
    const [formData, setFormData] = useState({ title: '', prose: '', id: localStorage.getItem('userId'), genre: [], writer: localStorage.getItem('userName'), like: 0, born: '', thumbLink: '', fullLink: '', text: '' })
    
    const handleChange = (event) =>  {
        event.target.name === 'genre' ? setGenre_String(event.target.value)
        : setFormData( { ...formData, [event.target.name]: event.target.value } )
    }
    
    useEffect(() => {
        if(id){     
            // console.log(genre)
            setGenre_String(genre.join(' #'))
            setFormData({ title, prose, id, genre, like,
                                writer: localStorage.getItem('userName'), born: '', thumbLink, fullLink, text
                                }) 
        } else {
                    setFormData({ title: formData.title, prose: formData.prose, id: localStorage.getItem('userId'), genre: formData.genre,
                                writer: localStorage.getItem('userName'), like: formData.like, born: '', thumbLink, fullLink, text
                                })  
                }
    // eslint-disable-next-line
    }, [id, title, prose, genre,    text, thumbLink, fullLink])
    
    const handleSubmit = (event) => {
        event.preventDefault() 

        genre_string = genre_string.replace(/\s+/g, '')
        if(genre_string === ''){
            formData.genre = "#unbound".split('#')
        }
        else
            {formData.genre = genre_string.split('#')}
            
        console.log('xxxx', formData.genre)
        if(title){
            axios.patch(`${url}/${id}/updateprose`, formData)
            .then((res) => {
                console.log('updated the prompt')
                setGenre_String('')
                history.push('/usedprompts')
            })
            .catch((error) => console.log(error))
        } 
        else if(text === '' && thumbLink === ''){
            setIsPromptChosen('Choose a prompt first from the generator!')
        } 
        else {
            formData.born = moment().format()            

            console.log(formData)
            axios.post('http://localhost:5000/postprose', formData)
            .then( res => console.log(res))
            .catch( err => console.log(err))   

            setFormData({ title: '', prose: '', id: localStorage.getItem('userId'), genre: [], writer: localStorage.getItem('userName'), like: 0, born: '' })       
            clearPromptGeneratedTextOrLinkCallback()
            setIsPromptChosen('Submitted! Go to prompts taken section or try another prompt')
            setGenre_String('')
        }
    }

    return(
        <>
            <Container className="submit-btn" component="main">
                <Paper className={classes.paper} elevation={4}>                      
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={2} >                      
                            <Grid item xs={12} ><TextField value={formData.title} required variant="outlined" fullWidth name="title" label="Title" onChange={handleChange} /></Grid>
                            <Grid item xs={12} ><TextField value={formData.prose} required multiline rows={15} variant="outlined" fullWidth name="prose" label="Story" onChange={handleChange} /></Grid>           
                            <Grid item xs={12} ><TextField value={genre_string} variant="outlined" fullWidth name="genre" label="Genres(use #)" onChange={handleChange} /></Grid>
                        </Grid>
                        
                        <div className="submit-and-error">
                                <div className={(isPromptChosen === 'Submitted! Go to prompts taken section or try another prompt') ? "success-submit" : "please-choose-prompt"}>{isPromptChosen}</div>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>   
                        </div>       
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default PromptForm