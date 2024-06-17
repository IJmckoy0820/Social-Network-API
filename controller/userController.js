const { User, Thought } = require('../models');

module.exports = { 

// Get all user
async getUsers(req, res) {
    try {
      const user = await User.find().populate('user');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Get a user
async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('students');

      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Create a user
async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

 // Update a user
 async updateUser(req, res) {
    try {
      const user = await Course.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json();
    } catch (err) {
      res.status(500).json(err);
    }
  },



  async addFriend(req,res) {

    const { userId } = req.params;
    const { friendId } = req.body;

try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the friendId to the user's friends array
    user.friends.push(friendId);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Friend added successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }

  },





 }
