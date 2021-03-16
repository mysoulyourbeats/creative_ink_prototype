import Prose from '../models/prose.js'
import Prompt from '../models/prompt.js'
import mongoose from 'mongoose'

export const getprose = async(req, res) => {
    
    const { id, type } = req.params
    
    let result
    try {

        if(!id && type === 'prompt'){
            // result = await Prompt.find()
            result = await Prompt.find({}, {"id":0}).sort({ born: -1}) /* i.e., include all columns except the damned ID column*/
            console.log("hall call")
        }
        else if(type === 'prompt'){
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
        return res.status(404).send()
    }
}


export const postprose = async(req, res) => {
    // console.log('userId is :', req.userId)
    const { title, prose, id, genre, writer, like, born, fullLink, text } = req.body
    // console.log(text)
    try {
        if(genre){
            const result = await Prompt.create({ title, prose, id, genre, writer, 
                                  like: { count: like },
                                  born, thumbLink: null, fullLink, text })
            console.log(result)
        }
        else{
            await Prose.create({ title: title, prose: prose, id: id }) 
        }
        return res.status(200).send()
    } catch (error) {     
        console.log(error)
        return res.status(404).send()
    }
}


export const updateprose = async(req, res) => {
    
    const { id } = req.params
    const { title, prose, genre, writer, like, thumbLink, fullLink, text } = req.body
   
    if(!mongoose.Types.ObjectId.isValid(id)){
            console.log('User ID is not valid')
            return res.status(404).send()
        }
    
    try {        
        // const result = await Prose.findByIdAndUpdate(id, { title: title, prose: prose }, { new: true })
        // console.log(result)
        if(genre){
            console.log('rpompt it is')
            await Prompt.findByIdAndUpdate(id, { title, prose, genre, writer, like, thumbLink, fullLink, text }).sort({ born: -1})
        } else {
            await Prose.findByIdAndUpdate(id, { title, prose })
        }
        return res.status(200).send()
    } catch (error) {
        console.log(error)
        return res.status(404).send()
    }
}

export const deleteprose = async(req, res) => {
    
    const { id, type } = req.params
  
    try {
        if(type === 'prompt'){
            await Prompt.findByIdAndDelete(id)
        }
        else{
            await Prose.findByIdAndDelete(id)
        }
        // console.log('deleted that bch')
        res.status(200).send()
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}

export const likestory = async(req, res) => {

    try {
        const { id } = req.params
        const  { userId }  = req.body
  
        // (id, { title: title, prose: prose }, { new: true })
        const result = await Prompt.findByIdAndUpdate(id, {
                                                           like : {
                                                                    likedBy : [{userId}]
                                                                  }
                                                          }
                                                     )
        console.log(result)
        // const x = await result.find({likedBy.userId : userId})
        res.status(200).send()
    } catch (error) {
        console.log(error)
        return res.status(404).send()
    }
}