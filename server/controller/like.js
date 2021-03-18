import Prompt from '../models/prompt.js'

const likestory = async(req, res) => {

    try {
        const { id } = req.params
        const  { userId }  = req.body
 
        let result = await Prompt.findOne({_id: id, 'like.likedBy.userId': userId})
       
        if (!result) {
            // console.log('liked')
            result = await Prompt.findByIdAndUpdate(id, {$inc: {'like.count': 1}, $push: {'like.likedBy' : {userId: userId}} }, { new: true })
        } else {
            // console.log('disliked')
            result = await Prompt.findByIdAndUpdate(id, {$inc: {'like.count': -1}, $pull: {'like.likedBy' : {userId: userId}} }, { new: true })
        }
        
        result = result.like.count
        return res.status(200).send({ result })
    } catch (error) {
        console.log(error)
        return res.status(404).send()
    }
}

export default likestory