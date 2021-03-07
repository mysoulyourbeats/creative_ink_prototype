import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Paper, Button } from '@material-ui/core'
import axios from 'axios'

import useStyles from '../styles.js'
import './styles.css'
const url = 'http://localhost:5000'

const ProseCard = ({ id, title, prose, callback }) => {
    const classes = useStyles()    

    const deleteProse = () => {
        axios.delete(`${url}/${id}/deleteprose`)
        .then((res) => {
            callback(id)
            console.log('Suxccessfully deleted')
        })
        .catch((error) => console.log(error))
    }

    return(
        <div>
           <Container>
                <Paper className={classes.paper}>
                    <div>{title}</div>
                    <div>{prose}</div>
                    <div className="Container">
                        <Link to = {{
                                pathname: "/postprose",
                                state: { 
                                    title,
                                    prose,
                                    id                           
                                }}}>
                                <Button color="primary" variant="contained">Update</Button>
                        </Link>
                        <Button color="secondary" variant="contained" onClick={deleteProse}>Delete</Button>
                    </div>
                </Paper>
           </Container>
        </div>
    )
}

export default ProseCard