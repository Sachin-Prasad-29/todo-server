"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentuser = exports.signout = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../model/user.model");
const common_1 = require("@skptickets/common");
const password_1 = require("../services/password");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    if (existingUser) {
        throw new common_1.BadRequestError('User Already exist');
    }
    const user = user_model_1.User.build({ email, name, password });
    yield user.save();
    // Generate JWT
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY);
    // Store it on session token
    req.session = {
        jwt: userJwt
    };
    res.status(201).send(user);
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    if (!existingUser) {
        throw new common_1.BadRequestError('Invalid credentials');
    }
    const passwordsMatch = yield password_1.Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new common_1.BadRequestError('Invalid credentials');
    }
    // From Here the user is allowed to login
    // Generate JWT
    const userJwt = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY);
    // Store it on session object
    req.session = {
        jwt: userJwt
    };
    res.status(200).send(existingUser);
});
exports.signin = signin;
const currentuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ currentUser: req.currentUser || null });
});
exports.currentuser = currentuser;
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    res.send({});
});
exports.signout = signout;
