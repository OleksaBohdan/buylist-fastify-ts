"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Session_1 = require("../models/Session");
async function createSession(user) {
    const token = jsonwebtoken_1.default.sign({ data: { profileId: user.profileId, homeName: user.homeName } }, config_1.secretJwt, {
        expiresIn: 300000000,
    });
    let session = await Session_1.Session.findOne({ user: user });
    if (!session) {
        session = new Session_1.Session({ user: user, token: token, lastVisit: new Date() });
        await session.save();
    }
    else {
        session.token = token;
        session.lastVisit = new Date();
        await session.save();
    }
    return token;
}
exports.createSession = createSession;
