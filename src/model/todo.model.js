const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Todo',
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: [true, 'Todo Name must be Provided']
            },
            userEmail: {
                type: String,
                required: [true, 'User email must be provided']
            },
            completed: {
                type: Boolean,
                default: false
            }
        },
        { timestamps: true }
    )
);
