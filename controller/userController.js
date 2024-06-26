const { User, Thought } = require('../models');

module.exports = { 

// Get all user with populated thoughts
async getUser(req, res) {
    try {
      const user = await User.find().populate({ path:'thoughts', model: Thought});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Get a single user
async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');
        

      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      res.json(user);
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
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return  res.status(404).json({ message: 'No user with this id!' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
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


  async deleteFriend(req,res) {

    const { userId, friendId } = req.params;
    

try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // remove the friendId to the user's friends array
    user.friends.pull(friendId);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Friend delete successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }

  },


  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
  
      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },






 }
