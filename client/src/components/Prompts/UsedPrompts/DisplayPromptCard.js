import React from 'react'
import { Container, Paper, Button } from '@material-ui/core'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

const DisplayPromptCard = ({ title, prose, genre, like, thumbLink, fullLink, text }) => {

    // const deleteProse = () => {
    //     axios.delete(`${url}/${id}/deleteprose`)
    //     .then((res) => {
    //         callback(id)
    //         console.log('Suxccessfully deleted')
    //     })
    //     .catch((error) => console.log(error))
    // }

    return(
        <>
          <div>
                <Container>
                    <Paper>
                        <div>{title}</div>
                        <div>{prose}</div>
                        <div>{genre}</div>
                        <div>{like}</div>
                        <div>{thumbLink}</div>
                        <div>{fullLink}</div>
                        <div>{text}</div>
                        <div className="Container">
                            {/* <Link to = {{
                                    pathname: "/postprose",
                                    state: { 
                                        title,
                                        prose,
                                        id                           
                                    }}}>
                                    <Button color="primary" variant="contained">Update</Button>
                            </Link> */}
                            <Button color="secondary" variant="contained">Delete</Button>
                        </div>
                     </Paper>
                 </Container>
          </div>
        </>
    )
}

export default DisplayPromptCard 

