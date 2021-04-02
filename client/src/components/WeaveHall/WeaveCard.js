import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Paper } from '@material-ui/core'
import useStyles from '../styles'

const WeaveCard = ({ title, spanArray }) => {
    const classes = useStyles()   
    const subtitle = spanArray[0].userProse
    return (
         <>

          <div className="used-prompts-wrapper">
                <Container className={classes.paper}>
                    <Paper>
                        <Link to = {{      pathname: "/fullweave",
                                            state: { 
                                                title, spanArray                                                                       
                                            }}}>
                            <h2 className="used-written-prompt">{title}</h2>                                                            
                        </Link>

                        <div className="text-meta-data">
                            <div><h3>{subtitle}</h3></div>
                            <div className="used-story">{spanArray.map((val) => <span>{val.userProse}</span>)}</div>
                            {/* <div className="used-genres">kfkfjfj</div>*/}
                        </div>
                     </Paper>
                 </Container>
          </div>
        </>
    )
}

export default WeaveCard