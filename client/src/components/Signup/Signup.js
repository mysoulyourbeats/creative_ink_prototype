import { React, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Container, Grid, Button, Typography, Paper } from '@material-ui/core'
import Input from './Input'
import useStyles from './styles';
import { Context } from '../Context'

import axios from 'axios'
const url = "http://localhost:5000"

const Signup = () => {

    const classes = useStyles()    
    const[showPassword, setShowPassword] = useState(false)
    const[isSignup, setIsSignup] = useState(true)
    
    const initialSignupState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
    const initialSigninState = { email: '', password: ''}
    const [formData, setFormData] = useState(isSignup ? initialSignupState : initialSigninState)
    const [failedAuth, setFailedAuth] = useState('')
    // eslint-disable-next-line
    const [isAuth, setIsAuth] = useContext(Context)

    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()        

                axios.post(isSignup ? `${url}/signup` : `${url}/signin`, formData, {
                    withCredentials: true
                })
                .then((res) => {
                        if(res.data.stat === 200){
                             
                             localStorage.setItem('isAuth', true)
                             localStorage.setItem('userName', res.data.name)   
                             localStorage.setItem('userID', res.data.id)         
                             setIsAuth(true)
                             history.push('/')                                                                                   
                        }
                        else{
                            const display = res.data.message
                            setFailedAuth(display)
                            console.log('This is what they call hell')                        
                        }
                    })
                .catch((err) => console.log(err))
    }

    const handleChange = (event) => {        
        setFormData( { ...formData, [event.target.name]: event.target.value } )
    }

    const handleSwitch = () => {
        setIsSignup(prevState => !prevState)
        setFailedAuth('')
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    
    return(
        
        <>  
            {console.log('rerendered')}
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={4}>              
                    <Typography variant="h5" align="center">{isSignup ? 'Sign Up' : 'Log In'}</Typography>                
                   
                    {failedAuth !== '' ? <Typography style={{color: "rgb(158, 32, 44)",  paddingTop : "20px"}}>{failedAuth}</Typography> : null}
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={3}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                    </>
                                )
                            } 
                            <Input name="email" label="Email" handleChange={handleChange} type="email"  />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                            { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/> }                        
                        </Grid>
                        
                            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                                { isSignup ? 'Sign Up' : 'Log In' }
                            </Button>       
    
                             <Button fullWidth variant="contained" color="primary" onClick={handleSwitch} className={classes.submit}>
                                     { isSignup ? 'Or Log In' : 'Or Sign Up' }
                            </Button>         
                    </form>
                </Paper>
            </Container>
            
        </>
    )
}

export default Signup