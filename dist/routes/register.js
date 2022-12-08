"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const app_1 = require("../app");
const User_1 = require("../models/User");
async function register() {
    app_1.server.post('/api/register', async (request, reply) => {
        console.log('Register');
        const credentials = request.body;
        const userID = (await User_1.User.count()) + 1;
        const user = new User_1.User({
            homeName: credentials.homeName,
            email: credentials.email,
            profileId: userID,
        });
        console.log('pass', credentials.password);
        try {
            console.log(user.setPassword(credentials.password));
            await user.setPassword(credentials.password);
            await user.save();
            reply.status(201);
            reply.send({ body: 'ok' });
            return;
        }
        catch (e) {
            if (e instanceof Error) {
                reply.status(200);
                reply.send({ body: e.message });
                return;
            }
        }
    });
}
exports.register = register;
