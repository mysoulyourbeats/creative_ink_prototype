import React from 'react'
import ProgressiveImage from "react-progressive-graceful-image"
import { Typography } from '@material-ui/core'
import './prompts.css'

const PromptCard = ({fullLink, thumbLink, text }) => {
    return(
        <div className="prompt-card-wrapper">
            {  text === '' ?
                <div>
                     <ProgressiveImage                  
                        src={fullLink}
                        placeholder={thumbLink}
                    >
                         {(src, loading) => <img className={ loading ? "thumbnail" : "full-image" } src={src} alt="an alternative text" />}
                    </ProgressiveImage>
                </div>

                :
                <Typography>
                    {text}
                </Typography>
            }
        </div>
    )
}

export default PromptCard