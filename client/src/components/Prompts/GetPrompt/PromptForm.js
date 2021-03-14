import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Container, Grid, Button, Paper, TextField } from '@material-ui/core'
import useStyles from './styles.js'
import './prompts.css'
import axios from 'axios'

const PromptForm = ({thumbLink, fullLink, text, clearPromptGeneratedTextOrLinkCallback}) => {
    const classes = useStyles()  
    const [isPromptChosen, setIsPromptChosen] = useState('')
    const [formData, setFormData] = useState({ title: '', prose: '', id: localStorage.getItem('userID'), genre: [], writer: localStorage.getItem('userName'), like: 0, born: '', thumbLink: '', fullLink: '', text: '' })
    const handleChange = (event) =>  {
        event.target.name === 'genre' ? (formData.genre = (event.target.value.split('#')))
        : setFormData( { ...formData, [event.target.name]: event.target.value } )
    }
    
    useEffect(() => {
        setFormData({ title: formData.title, prose: formData.prose, id: localStorage.getItem('userID'), genre: formData.genre,
                      writer: localStorage.getItem('userName'), like: formData.like, born: '', thumbLink, fullLink, text
                    })  
    // eslint-disable-next-line
    }, [text, thumbLink, fullLink])
    
    const handleSubmit = (event) => {
        event.preventDefault() 

        if(text === '' && thumbLink === ''){
            setIsPromptChosen('Choose a prompt first from the generator!')
        } 

        else{
            formData.born = moment().format()
            if(formData.genre.length === 0)  
                {formData.genre.push('unbound')}

            console.log(formData)
            axios.post('http://localhost:5000/postprose', formData)
            .then( res => console.log(res))
            .catch( err => console.log(err))   

            setFormData({ title: '', prose: '', id: localStorage.getItem('userID'), genre: [], writer: localStorage.getItem('userName'), like: 0, born: '' })       
            clearPromptGeneratedTextOrLinkCallback()
            setIsPromptChosen('Submitted! Go to prompts taken section or try another prompt')
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
                            <Grid item xs={12} ><TextField variant="outlined" fullWidth name="genre" label="Genres(use #)" onChange={handleChange} /></Grid>
                        </Grid>
                        
                        <div className="submit-and-error">
                                <div className={isPromptChosen === 'Submitted! Go to prompts taken section or try another prompt' ? "success-submit" : "please-choose-prompt"}>{isPromptChosen}</div>
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