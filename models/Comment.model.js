const {Schema, model } = require ("mongoose")
const mongoose = require("mongoose")

const commentSchema = new Schema ({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },

  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required'],
  },

  text: {
    type: String, 
    required: [true, 'Comment text is required'],
  } 

  })

const Comment = model("Comment", commentSchema)

module.exports = Comment
