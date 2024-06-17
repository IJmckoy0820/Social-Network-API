const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

// Get all thoughts
async getThoughts(req, res) {
    try {
      const thought = await Thought.find().populate('User');
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Get a course
async getSingleThought(req, res) {
    try {
      const thought = await User.findOne({ _id: req.params.thoughtId })
        .populate('thought');

      if (!thought) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Create a course
async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

 // Update a course
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

      res.json();
    } catch (err) {
      res.status(500).json(err);
    }
  },

    




}

