"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAuth = void 0;
const app_1 = require("../app");
const authenticateToken_1 = require("../controllers/authenticateToken");
async function tokenAuth() {
    app_1.server.get('/api/auth', (request, reply) => {
        console.log('Authenticate');
        const token = request.headers.token;
        console.log(token);
        (0, authenticateToken_1.authenticateToken)(token).then((result) => {
            if (!result) {
                console.log(`result ${result}`);
                reply.status(404);
                reply.send('Invalid token');
            }
            else {
                console.log(`result ${result.data.profileId}`);
                reply.headers({ homename: result.data.homeName });
                reply.status(200);
                reply.send('ok');
            }
        });
    });
}
exports.tokenAuth = tokenAuth;
