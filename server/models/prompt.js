import mongoose from 'mongoose'

const likeSchema = mongoose.Schema({
    userId: {type: String, default: ''}
})

const promptSchema = mongoose.Schema({
    title: {type: String, required: true},
    prose: {type: String, required: true},
    id: {type: String, required: true},
    genre: [String],
    writer: {type: String, required: true},
    like: { type: {
                    count: {type: Number, default: 0}, 
                    likedBy: {type: [likeSchema]}
                  }
          },
    born: {type: Date},
    thumbLink: {type: String, default: 'pp.boobba'},
    fullLink: String,
    text: String    
})

export default mongoose.model('PromptModel', promptSchema)
