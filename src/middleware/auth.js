const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    jwt.verify(token, CONSTANTS.JWT_SECRET, function (err, claims) {
        if (err) {
            res.status(401).json({
                status: 'Failed',
                msg: 'Unauthorized Request'
            });
        }

        res.locals.email = claims.email;
        next();
    });
};

module.exports = authenticate;
