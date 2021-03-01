import React from 'react'
import {BrowserRouter as Router, Route } from "react-router-dom"
import Signup from './components/Signup/Signup'
import Home from './components/Home/Home'
import Myworks from './components/Myworks/Myworks'
import NavBar from './components/NavBar/NavBar'
import { StateProvider } from './components/Context'

const App = () => {

    return(      
        <>              
            <Router>   
                <StateProvider>
                    <NavBar />
                    <Route path="/signup" exact component={Signup} /> 
                </StateProvider>
                <Route path="/" exact component={Home} />
                 
                <Route path="/myworks" exact component={Myworks} />
            </Router>
        </>
    )

}

export default App