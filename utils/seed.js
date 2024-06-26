const { connectDB } = require('../config/connection');

const User = require('../models/user');


const Thought = require('../models/thought');
connectDB().then(async() => {
// Import necessary modules and dependencies

// Array of user objects
const users = [
    { username: 'John Doe', email: 'john@example.com', password: 'password123' },
    { username: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
    // Add more user objects as needed
];


// Array of thought objects
const thoughts = [
    { thoughtText: 'This is a thought', username: 'John Doe', userId: 'user_id_1', reactions: [{ username: 'Jane Smith', reactionBody: 'Like' }]},
    { thoughtText: 'Another thought', username: 'Jane Smith', userId: 'user_id_2',  reactions: [{ username: 'John Doe', reactionBody: 'Dislike' }]},
    // Add more thought objects as needed
];

// Function to seed users
// Function to seed users and return their IDs
const seedUsers = async () => {
    await User.deleteMany({}); // Clear existing users
    const createdUsers = await User.insertMany(users); // Insert new users and get them back
    return createdUsers.map(user => user._id); // Return an array of user IDs
};

// Function to seed thoughts, referencing user IDs
const seedThoughts = async (userIds) => {
    await Thought.deleteMany({}); // Clear existing thoughts

    // Modify your thoughts array to use the userIds
    const modifiedThoughts = thoughts.map((thought, index) => ({
        ...thought,
        userId: userIds[index % userIds.length], // Assign the correct userId to the thought
        reactions: thought.reactions.map(reaction => ({
            ...reaction,
            userId: userIds.find(id => id !== thought.userId) // Assign the userId for the reaction to a different user
        }))
    }));

    await Thought.insertMany(modifiedThoughts);
};

// Main seeding process
try {
    const userIds = await seedUsers(); // Seed users and get their IDs
    await seedThoughts(userIds); // Seed thoughts with user IDs
    console.log('Database seeded!');
} catch (error) {
    console.error('Error seeding database:', error);
}
});