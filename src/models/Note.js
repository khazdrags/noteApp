const mongoose = require('mongoose')
const { Schema } = mongoose

const NoteSchema = new Schema({
    tittle: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Note', NoteSchema)