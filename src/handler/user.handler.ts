import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.model';
import { BadRequestError } from '@skptickets/common';
import { Password } from '../services/password';

const signup = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('User Already exist');
    }

    const user = User.build({ email, name, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_KEY!
    );
    // Store it on session token
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
};

const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    // From Here the user is allowed to login
    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);
};

const currentuser = async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
};

const signout = async (req: Request, res: Response) => {
    req.session = null;
    res.send({});
};

export { signup, signin, signout, currentuser };
