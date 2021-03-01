import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import Prose from '../models/prose.js'

export const signin = async(req, res) => {
    const { email, password } = req.body
   
    try {
        const oldUser = await User.findOne({ email })
        
        if(!oldUser)
             return res.status(200).json({ stat: 404, message: 'User does not exist' })
         
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
          
        if(!isPasswordCorrect) return res.status(200).json({ stat: 400, message: "Invalid credentials" })


        const token = jwt.sign({ id: oldUser._id }, 'secretkey')
        return res.cookie('token', token, {httpOnly: false, secure: false}).status(200).json({ stat: 200, name: oldUser.name, id: oldUser._id, token })       

    } catch (error) {
        return res.status(200).json({ stat: 404, message: 'Something went wrong.' })        
    }
}


export const signup = async(req, res) => {
    
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const oldUser = await User.findOne({ email })
        
        if(oldUser) return res.status(200).json({ stat: 400, message: 'User already exists!' })
        
        if(password !== confirmPassword) return res.status(200).json({ stat: 400, message: 'Passwords do not match' })
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})
        const token = jwt.sign({ id: result._id }, 'secretkey')

        return res.cookie('token', token, {httpOnly: false, secure: false}).status(200).json({ stat: 200, name: `${firstName} ${lastName}`, id: result._id, token})
    } catch (error) {
        return res.status(200).json({ stat: 500, message: 'Something went wrong.' })        
    }
}

export const clearcookies = (req, res) => {
 
    res.clearCookie('token').status(200).send()
}

export const postprose = async(req, res) => {
    const { title, prose, id } = req.body
    
    try {
        await Prose.create({ title: title, prose: prose, id: id })        
        return res.status(200).send()
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

export const getprose = async(req, res) => {

    const { id }  = req.body
  
    try {
        const result   = await Prose.find({ id })
        if(!result)
            return res.status(404).send()
               
        return res.status(200).json({ result })        
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
 
}