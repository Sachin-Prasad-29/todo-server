const User = require('../model/user.model');

const registerSrv = async (user) => {
    let insertedUser;
    try {
        insertedUser = await User.create(user);
    } catch (error) {
        throw new Error('Something went wrong');
    }
    if (!insertedUser) {
        throw new Error('Bad Credentials');
    }
    return insertedUser;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (user === null) {
        throw new Error('No user Found with given Email');
    }
    return user;
};

const checkPassword = async (user, plainTextPassword) => {
    let isMatch;
    try {
        isMatch = await user.checkPassword(plainTextPassword);
    } catch (error) {
        throw new Error('Something went wrong checking credentials');
    }
    if (!isMatch) {
        throw new Error('Bad Credentials');
    }
    return isMatch;
};

module.exports = {
    registerSrv,
    getUserByEmail,
    checkPassword
};
