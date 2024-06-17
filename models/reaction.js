const { Schema, model } = require('mongoose');

// Schema to create Student model
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
  
  const reaction = model('reaction', reactionSchema);
  
  module.exports = Student;
  