//const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

// Get all thoughts
async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Get a thought
async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thougt with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Create a thought
async createThought(req, res) {
  const { userId } = req.body;
    try {
      const thought = await Thought.create(req.body);
       // Find the user by userId and push the _id of the created thought to their thoughts array
       const user = await User.findById(userId);
       user.thoughts.push(thought._id);
       await user.save();
   
  
      res.json(thought);
      
    } catch (err) {
      console.log(err);
      return res.status(500).json(err) ;
    }
  },

 // Update a thought
 async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // delete a thought
async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      

    if (!thought) {
      return res.status(404).json({ message: 'No User with that ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},


// delete a reaction
async DeleteReaction(req, res) {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Find the index of the reaction to delete
    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id == reactionId);

    if (reactionIndex === -1) {
      return res.status(404).json({ message: 'Reaction not found' });
    }

    // Remove the reaction from the reactions array
    thought.reactions.splice(reactionIndex, 1);
    const updatedThought = await thought.save();

    res.json(updatedThought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }





  
},



async addReaction(req, res) {
  try {
    const { thoughtId } = req.params;
    const { reactionBody } = req.body;
    const username = req.user.username;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    if (!reactionBody) {
      return res.status(400).json({ message: 'Reaction body is required' });
    }

    const newReaction = {
      reactionBody, // Add other required fields as necessary
      username,
    };

    // add the reaction to the reactions array
    thought.reactions.push(newReaction);
    const updatedThought = await thought.save();

    res.json(updatedThought);

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}








}




