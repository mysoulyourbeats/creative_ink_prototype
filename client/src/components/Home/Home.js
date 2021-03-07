import React from 'react'
import { Button } from '@material-ui/core'
import './home.css'
const Home = () => {

    return(
       <div className="first-page-wrapper">
            <div className="welcome">
               <p className="title">Creative.Inc</p>
               <p className="specs">Write  |  Share  |  Collaborate</p>
               <Button size="large" variant="outlined">Start Creating</Button>
            </div>
            
            <div className="para-styler prompt">
               <h2>Spark your creative bulb</h2>
               <p>Don't know where to start? Try the random prompt generator! <br/>Served in two styles : Picture Prompts and Writing Prompts</p>
               <Button size="large" variant="outlined">Try Prompts</Button>
           </div>

           <div className="para-styler weave">
               <h2>Weave a story together</h2>
               <p>Let everyone forge the path of the story and add their own flavours.<br/> Write together, turn by turn.</p>
               <Button size="large" variant="outlined">Create together</Button>
           </div>

           <div className="para-styler drafts">
               <h2>Start writing your draft</h2>
               <p>Note down ideas, write, and save your drafts. Come back and update them anytime!</p>
               <Button size="large" variant="outlined">Start Drafting</Button>
            </div>

       </div>

    )
}

export default Home