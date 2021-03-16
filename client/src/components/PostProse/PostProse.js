import React, { useState, useEffect } from 'react'
import { Container, Grid, Button, Paper, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import useStyles from '../styles.js'
import './styles.css'

const url = "http://localhost:5000"
const PostProse = (props) => {
    axios.get('http://localhost:5000/')
    .then(res => console.log(res))
    .catch(err => console.log(err))
    
    const title = props?.location?.state?.title
    const prose = props?.location?.state?.prose
    const id =    props?.location?.state?.id

    const classes = useStyles()    
    const [formData, setFormData] = useState({ title: '', prose: '', id: localStorage.getItem('userId') })
    const history = useHistory()

    useEffect(() => {

        if(title){
            setFormData({ title: title, prose: prose, id })
            console.log(title)
        }

        else
            setFormData({title: '', prose: '', id: localStorage.getItem('userId')})
        
    }, [title, prose, id])
    

    const handleChange = (event) => {        
        setFormData( { ...formData, [event.target.name]: event.target.value } )
    }

    const handleSubmit = (event) => {
        event.preventDefault()        
        
        if(title){
            axios.patch(`${url}/${id}/updateprose`, formData)
            .then((res) => {
                // console.log('suceeesfuuul')
                history.push('/drafts')
            })
            .catch((error) => console.log(error))
        } else {
            axios.post(`${url}/postprose`, formData, { withCredentials: true })
            .then((res) => {
                    // console.log('successfully submitted')   
                    history.push('/drafts')             
            })
            .catch((error) => console.log(error))
        }

        setFormData({title: '', prose: '', id: localStorage.getItem('userId')})
    }

    return(
        <div className="postprose-wrapper">        
            <Container component="main" maxWidth="md">
                <Paper  elevation={4}>              
                    <div className="prosetitle" variant="h5" align="center">Drafts</div>                                    
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={3}>                      
                            <Grid item xs={12} ><TextField value={formData.title} required variant="outlined" fullWidth name="title" label="Title" onChange={handleChange} autoFocus /></Grid>
                            <Grid item xs={12} ><TextField value={formData.prose} required multiline rows={15} variant="outlined" fullWidth name="prose" label="Prose" onChange={handleChange} /></Grid>           
                        </Grid>
                        
                            <Button type="submit" variant="contained" color="primary" className={classes.submit}>Submit</Button>            
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default PostProse