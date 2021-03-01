import React, { useState } from 'react'
import { Container, Grid, Button, Paper, TextField } from '@material-ui/core'
import axios from 'axios'

import useStyles from './styles';
import './styles.css'

const url = "http://localhost:5000"
const PostProse = () => {
    const classes = useStyles()    
    const [formData, setFormData] = useState({ title: '', prose: '', id: localStorage.getItem('userID') })

    const handleChange = (event) => {        
        setFormData( { ...formData, [event.target.name]: event.target.value } )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    
        axios.post(`${url}/postprose`, formData)
        .then((res) => {
            if(res.data.stat === 200){
                console.log('successfully submitted')                
            }

            else{
                console.log('Something went wrong')
            }
        })
        .catch() 
    }

    return(
        <>        
            <Container component="main" maxWidth="md">
                <Paper className={classes.paper} elevation={4}>              
                    <div className="prosetitle" variant="h5" align="center">Prose</div>                                    
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={3}>                      
                            <Grid item xs={12} ><TextField required variant="outlined" fullWidth name="title" label="Title" onChange={handleChange} autoFocus /></Grid>
                            <Grid item xs={12} ><TextField required multiline rows={15} variant="outlined" fullWidth name="prose" label="Prose" onChange={handleChange} /></Grid>           
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