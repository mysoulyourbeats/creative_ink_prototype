import React from 'react'
import {BrowserRouter as Router, Route } from "react-router-dom"
import { StateProvider } from './components/Context'

import NavBar from './components/NavBar/NavBar'
import Signup from './components/Signup/Signup'
import Home from './components/Home/Home'
import Drafts from './components/Drafts/Drafts'
import PostProse from './components/PostProse/PostProse'
import APIcalls from './components/Prompts/GetPrompt/APIcalls'
import UsedPrompts from './components/Prompts/UsedPrompts/UsedPrompts'
import Weave from './components/Weave/Weave'
import Hall from './components/Hall/Hall'


const App = () => {

    return(      
        <>              
            <Router>   
                <StateProvider>
                    <NavBar />
                    <Route path="/signup" exact component={Signup} /> 
                </StateProvider>
                
                <Route path="/" exact component={Home} />
                <Route path="/drafts" exact component={Drafts} />
                <Route path="/postprose" exact component={PostProse} />
                <Route path="/prompts" exact component={APIcalls} />
                <Route path="/usedprompts" exact component={UsedPrompts} />                 
                <Route path="/weave" exact component={Weave} />                 
                <Route path="/hall" exact component={Hall} />                 
            </Router>
        </>
    )

}

export default App