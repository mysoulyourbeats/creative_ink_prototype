import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import useStyles from './styles';


const ProseCard = ({ title, prose }) => {
    const classes = useStyles()    
    console.log("thhis ois", title)
    return(
        <div>
           <Container className={classes.paper}>
                <Paper>
                    <Typography>{title}</Typography>
                    <Typography>{prose}</Typography>
                </Paper>
           </Container>
        </div>
    )
}

export default ProseCard