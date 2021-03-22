import React from 'react'
import { Container, Paper } from '@material-ui/core'
import ProgressiveImage from "react-progressive-graceful-image"

import './fullpost.css'


const FullPost = (props) => {
    console.log(props?.location?.state)
    const title = props?.location?.state?.title
    const prose = props?.location?.state?.prose
    const writer = props?.location?.state?.writer? props.location.state.writer : localStorage.getItem('userName')
    const genre = props?.location?.state?.genre
    const genre_string = (genre[0] === '' ? '' : '#') + (genre.join(' #'))

    const text = props?.location?.state?.text
    const thumbLink = props?.location?.state?.thumbLink
    const fullLink = props?.location?.state?.fullLink

    return(
            <div className="full-post-wrapper">
                <Container>
                    { !thumbLink? <div className="full-post-written-prompt">"{text} "</div> : null }                    
                    <Paper>
                    {thumbLink ? <div className="full-post-img">
                                            <ProgressiveImage                  
                                                src={fullLink}
                                                placeholder={thumbLink}
                                            >
                                                {(src, loading) => <img className={ loading ? "thumbnail" : "full-image" } src={src} alt="an alternative text" />}
                                            </ProgressiveImage>
                                     </div> : null
                    }
                        <div className="full-post-title padder"><h2>{title}</h2></div>
                        <div className="full-post-prose padder">{prose}</div>
                        <div className="full-post-genre padder">{genre_string}</div>
                        <div className="full-post-writer padder">- {writer}</div>
                    </Paper>
                </Container>
            </div>
    )
}

export default FullPost