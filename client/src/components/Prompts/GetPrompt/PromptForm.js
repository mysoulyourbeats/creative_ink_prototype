import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Container, Grid, Button, Paper, TextField } from '@material-ui/core'
import useStyles from './styles.js'
import axios from 'axios'

const PromptForm = ({thumbLink, fullLink, text}) => {
    const classes = useStyles()  
    
    const [formData, setFormData] = useState({ title: '', prose: '', id: localStorage.getItem('userID'), genre: '', writer: localStorage.getItem('userName'), like: 0, born: '', thumbLink: '', fullLink: '', text: '' })
    const handleChange = (event) =>  setFormData( { ...formData, [event.target.name]: event.target.value } )
    
    useEffect(() => {
        setFormData({ title: formData.title, prose: formData.prose, id: localStorage.getItem('userID'), genre: formData.genre,
                      writer: localStorage.getItem('userName'), like: formData.like, born: '', thumbLink, fullLink, text
                    })  
    // eslint-disable-next-line
    }, [text, thumbLink, fullLink])
    
    const handleSubmit = (event) => {
        event.preventDefault() 

        formData.born = moment().format()
        if(formData.genre === '')  
            formData.genre = 'unbound'

        console.log(formData)
        axios.post('http://localhost:5000/postprose', formData)
        .then( res => console.log(res))
        .catch( err => console.log(err))   

        setFormData({ title: '', prose: '', id: localStorage.getItem('userID'), genre: '', writer: localStorage.getItem('userName'), like: 0, born: '' })       
    }

    return(
        <>
            <Container className="submit-btn" component="main">
                <Paper className={classes.paper} elevation={4}>              
                    {/* <div className="prosetitle" variant="h5" align="center">Prose</div>                                     */}
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={2} >                      
                            <Grid item xs={12} ><TextField value={formData.title} required variant="outlined" fullWidth name="title" label="Title" onChange={handleChange} /></Grid>
                            <Grid item xs={12} ><TextField value={formData.prose} required multiline rows={15} variant="outlined" fullWidth name="prose" label="Story" onChange={handleChange} /></Grid>           
                            <Grid item xs={12} ><TextField value={formData.genre} variant="outlined" fullWidth name="genre" label="Genres(use #)" onChange={handleChange} /></Grid>
                        </Grid>
                        
                            <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                                Submit
                            </Button>            
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default PromptForm