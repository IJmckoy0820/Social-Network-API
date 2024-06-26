const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

// Define a validation function for email addresses
const validateEmail = function(email) {
  const re = /^[\w]+([.-]?[\w]+)*@[\w]+([.-]?[\w]+)*(\.[\w]{2,3})+$/;
  return re.test(email);
};



const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique:true,
        trimmed:true,
      },
      email: {
        type: String,
        required: true,
        unique:true,
        trimmed:true,
        validate: [validateEmail, 'Please provide a valid email address'],
        match: [
            /^[\w]+([.-]?[\w]+)*@[\w]+([.-]?[\w]+)*(\.[\w]{2,3})+$/,
            'Please provide a valid email address'
        ]

      },
      thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
      
      friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false
    }
  );

// Create a virtual property `friendsCount` that gets the number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

  
  const user = model('user', userSchema);
  
  module.exports = user;
  