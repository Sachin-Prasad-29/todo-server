const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email must be Provided'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name must be Provided']
    },
    password: {
        type: String,
        required: true
    }
});

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

// we can customize the schema further before model is created
userSchema
    .path('email')
    .validate(
        (email) => emailRegExp.test(email),
        'Invalid email. Please make sure the email is a valid email.'
    );

userSchema
    .path('password')
    .validate(
        (password) => passwordRegExp.test(password),
        'Password must have at least 1 upper case, 1 lower case, 1 digit, 1 special characters, and should be 8 characters in length.'
    );

const SALT_FACTOR = 10;

userSchema.pre('save', function (done) {
    const user = this;
    if (!user.isModified('password')) {
        done();
        return;
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
    console.log('executes immediately');
});

userSchema.methods.checkPassword = async function (plainTextPassword) {
    const hashedPassword = this.password;
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);
