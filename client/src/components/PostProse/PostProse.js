import React, { useState, useEffect } from 'react'
import { Container, Grid, Button, Paper, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import useStyles from '../styles.js'
import './styles.css'

const url = "http://localhost:5000"
const PostProse = (props) => {
    
    const title = props?.location?.state?.title
    const prose = props?.location?.state?.prose
    const id =    props?.location?.state?.id

    const classes = useStyles()    
    const [formData, setFormData] = useState({ title: '', prose: '', id: localStorage.getItem('userID') })
    const history = useHistory()

    useEffect(() => {

        if(title){
            setFormData({ title: title, prose: prose, id })
            console.log(title)
        }

        else
            setFormData({title: '', prose: '', id: localStorage.getItem('userID')})
        
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
            axios.post(`${url}/postprose`, formData)
            .then((res) => {
                    // console.log('successfully submitted')   
                    history.push('/drafts')             
            })
            .catch((error) => console.log(error))
        }

        setFormData({title: '', prose: '', id: localStorage.getItem('userID')})
    }

    return(
        <>        
            <Container component="main" maxWidth="lg">
                <Paper className={classes.paper} elevation={4}>              
                    <div className="prosetitle" variant="h5" align="center">Prose</div>                                    
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={3}>                      
                            <Grid item xs={12} ><TextField value={formData.title} required variant="outlined" fullWidth name="title" label="Title" onChange={handleChange} autoFocus /></Grid>
                            <Grid item xs={12} ><TextField value={formData.prose} required multiline rows={15} variant="outlined" fullWidth name="prose" label="Prose" onChange={handleChange} /></Grid>           
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

export default PostProse