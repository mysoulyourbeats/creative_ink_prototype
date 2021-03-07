import mongoose from 'mongoose'

const promptSchema = mongoose.Schema({
    title: {type: String, required: true},
    prose: {type: String, required: true},
    id: {type: String, required: true},
    genre: [String],
    writer: {type: String, required: true},
    like: {type: Number, default: 0},
    born: {type: Date},
    thumbLink: String,
    fullLink: String,
    text: String    
})

export default mongoose.model('PromptModel', promptSchema)