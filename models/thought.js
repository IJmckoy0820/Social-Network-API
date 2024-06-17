const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    inPerson: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
        type: String,
        required: true,
      },
    Reaction: [ reactionSchema ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
postSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
  });

const thought= model('thought', thoughtSchema);

module.exports = thought;
