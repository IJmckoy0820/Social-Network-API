const { Schema, Types } = require('mongoose');

// Schema to create reaction model
const reactionSchema = new Schema(
    {
      reactionID:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        max_length: 280,
      },
      username: {
        type: String,
        required: true,
        
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  
  
  module.exports = reactionSchema;
  