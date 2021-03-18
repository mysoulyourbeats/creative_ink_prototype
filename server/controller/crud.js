import Prose from '../models/prose.js'
import Prompt from '../models/prompt.js'
import mongoose from 'mongoose'

export const getprose = async(req, res) => {
    
    const { id, type } = req.params
    let result
    try {

        if(type === 'hall'){
  
            result = await Prompt.find({}, {"id": 0}).sort({ born: -1}).lean() /* i.e., include all columns except the damned ID column*/
            // FOR SETTING isLiked bool to each result object by checking if user has liked a particular post
            result = await Promise.all(result.map(async(val) => {
                if(await Prompt.findOne({'like.likedBy.userId': id, '_id': val._id}, '_id')){
                    val.isLiked = true
                } else {
                    val.isLiked = false
                }
                return val
            }))
            // console.log('fuck you god', result)
       }
        else if(type === 'prompt'){
            result = await Prompt.find({ id }).sort({ born: -1}).lean()
            result = await Promise.all(result.map(async(val) => {
                if(await Prompt.findOne({'like.likedBy.userId': id, '_id': val._id}, '_id')){
                    val.isLiked = true
                } else {
                    val.isLiked = false
                }
                return val
            }))
        }
        else{
            result = await Prose.find({ id })
        }
        
        if(result?.length === 0)
            return res.status(404).send()
           
        return res.status(200).send({ result })        
    } catch (error) {
        console.log(error)
        return res.status(404).send()
    }
}


export const postprose = async(req, res) => {
    // console.log('userId is :', req.userId)
    const { title, prose, id, genre, writer, born, thumbLink, fullLink, text } = req.body

    try {
        if(genre){
            const result = await Prompt.create({ title, prose, id, genre, writer, born, thumbLink, fullLink, text })
            // console.log(result)
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
    const { title, prose, genre, writer, thumbLink, fullLink, text } = req.body
   
    if(!mongoose.Types.ObjectId.isValid(id)){
            console.log('User ID is not valid')
            return res.status(404).send()
        }
    
    try {        
        if(genre){
            // console.log('updated prompt post')
            await Prompt.findByIdAndUpdate(id, {  title, prose, genre, writer, thumbLink, fullLink, text }).sort({ born: -1})
        } else {
            // console.log('updated prose post')
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
        // console.log('deleted in /deleteprose')
        res.status(200).send()
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}

