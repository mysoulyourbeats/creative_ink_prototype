import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Paper } from '@material-ui/core'
import axios from 'axios'

import useStyles from '../styles.js'
import './styles.css'
import edit from '../../Images/edit.png'
import trash from '../../Images/delete.png'

const url = 'http://localhost:5000'

const ProseCard = ({ id, title, prose, callback }) => {
    const classes = useStyles()    

    const deleteProse = () => {
        axios.delete(`${url}/${id}/prose/deleteprose`)
        .then((res) => {
            callback(id)
            console.log('Suxccessfully deleted')
        })
        .catch((error) => console.log(error))
    }

    return(
        <div className="prose-card-wrapper">
           <Container>
                <Paper className={classes.paper}>
                    <div className="draft-title"><h3>{title}</h3></div>
                    <div className="draft-prose">{prose}</div>
                    <div className="edit-options-div">
                        <Link to = {{
                                pathname: "/postprose",
                                state: { 
                                    title,
                                    prose,
                                    id                           
                                }}}>
                                <img className="edit" src={edit} alt="idgafaalt" />
                        </Link>
                        <img className="trash" src={trash} alt="idgafaalt" onClick={deleteProse} />
                    </div>
                </Paper>
           </Container>
        </div>
    )
}

export default ProseCard