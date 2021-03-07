import Prose from '../models/prose.js'
import Prompt from '../models/prompt.js'
import mongoose from 'mongoose'

export const postprose = async(req, res) => {
    const { title, prose, id, genre, writer, like, born, thumbLink, fullLink, text } = req.body
    console.log(text)
    try {
        if(genre){
            await Prompt.create({ title, prose, id, genre, writer, like, born, thumbLink, fullLink, text })
        }
        else{
            await Prose.create({ title: title, prose: prose, id: id }) 
        }
        return res.status(200).send()
    } catch (error) {     
        console.log(error)
        return res.status(500).send()
    }
}

export const getprose = async(req, res) => {
    
    const { id, type } = req.params
    let result
    try {
        if(type === 'prompt'){
            result = await Prompt.find({ id }).sort({ born: -1})
        }
        else{
            result = await Prose.find({ id })
        }
        
        if(result?.length === 0)
            return res.status(404).send()
           
        return res.status(200).json({ result })        
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

export const updateprose = async(req, res) => {
    
    const { id } = req.params
    const { title, prose } = req.body
   
    if(!mongoose.Types.ObjectId.isValid(id)){
            console.log('User ID is not valid')
            return res.status(404).send()
        }
    
    try {        
        // const result = await Prose.findByIdAndUpdate(id, { title: title, prose: prose }, { new: true })
        // console.log(result)
        await Prose.findByIdAndUpdate(id, { title: title, prose: prose })
        return res.status(200).send()
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

export const deleteprose = async(req, res) => {
    
    const { id } = req.params

    try {
        await Prose.findByIdAndDelete(id)
        // console.log('deleted that bitch')
        res.status(200).send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}