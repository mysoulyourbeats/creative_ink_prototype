import React from 'react'
import { Container, Paper, Tooltip } from '@material-ui/core'
import '../FullPost/fullpost.css'
import './fullweavepost.css'


const FullWeavePost = (props) => {
  
    const title = props?.location?.state?.title
    const spanArray = props?.location?.state?.spanArray

    const changeBackground = (randomColor) => document.getElementById(randomColor).style.backgroundColor = randomColor

    const removeBackground = (randomColor) => document.getElementById(randomColor).style.backgroundColor = 'transparent'

    return(
            <div className="full-post-wrapper">
                <Container>
                    <Paper>
                        <div className="full-post-title padder"><h2>{title}</h2></div>
                        <div className="full-post-prose padder">
                            {
                             spanArray.map((val) => 
                                <Tooltip title={val.penName} placement="top" arrow  
                                         interactive
                                         >
                                    <span key={val.randomColor} id={val.randomColor} style={{ cursor: 'pointer' }} onMouseOver={() => changeBackground(val.randomColor)} onMouseOut={() => removeBackground(val.randomColor)}>{val.userProse}</span>
                                </Tooltip>
                            )}
                        </div>
                    </Paper>
                </Container>
            </div>
    )
}

export default FullWeavePost