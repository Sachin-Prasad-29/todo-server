const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');

const {
    checkPassword,
    getUserByEmail,
    registerSrv
} = require('../services/user.services');

const register = async (req, res) => {
    try {
        return res.json(await registerSrv(req.body));
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'Failed', msg: error.message });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email && !password) {
            throw new Error('Email or Password Not provided');
        }

        const user = await getUserByEmail(email);

        await checkPassword(user, password);

        const claims = {
            email: user.email
        };
        jwt.sign(claims, CONSTANTS.JWT_SECRET, function (error, token) {
            // some problem in generating JWT
            if (error) {
                const httpError = createHttpError('Internal Server Error', 500);
                next(httpError);
            }
            const userDetails = {
                name: user.name,
                email: user.email,
                token: token,
                success: true
            };
            res.status(201).json(userDetails);
        });
    } catch (error) {
        res.status(404).json('Something went wrong', error.message);
    }
};

module.exports = {
    register,
    login
};
