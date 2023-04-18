import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const MembersSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    trim: true,
  },
  location: {
      type: String,
      trim: true
  }

})

MembersSchema.index({ name: 'text' })

module.exports =
  mongoose.models.Member || mongoose.model('Member', MembersSchema)