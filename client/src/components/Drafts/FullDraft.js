import React from 'react';
import { Container, Paper } from '@material-ui/core'

const FullDraft = (props) => {

    const title = props?.location?.state?.title
    const prose = props?.location?.state?.prose

    return (
        <div className="full-post-wrapper">
                <Container>
                    <Paper>
                        <div className="full-post-title padder"><h2>{title}</h2></div>
                        <div className="full-post-prose padder">{prose}</div>
                    </Paper>
                </Container>
            </div>
    )
}

export default FullDraft