"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const app_1 = require("../app");
const User_1 = require("../models/User");
const createSession_1 = require("../controllers/createSession");
async function login() {
    app_1.server.post('/api/login', async (request, reply) => {
        const credentials = request.body;
        const user = await User_1.User.findOne({ homeName: credentials.homeName });
        if (!user) {
            reply.status(404);
            return;
        }
        if (await user.checkPassword(credentials.password)) {
            reply.status(200);
            const token = await (0, createSession_1.createSession)(user);
            console.log(token);
            reply.headers({ token: token, homename: credentials.homeName });
            return;
        }
        else {
            reply.status(401);
        }
    });
}
exports.login = login;
