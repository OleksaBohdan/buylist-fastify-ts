"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const productsWebsocket_1 = require("./services/productsWebsocket");
const register_1 = require("./routes/register");
const login_1 = require("./routes/login");
const auth_1 = require("./routes/auth");
const path_1 = __importDefault(require("path"));
const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: true,
};
exports.server = (0, fastify_1.default)({ logger: envToLogger.development });
exports.server.register(static_1.default, { root: path_1.default.join(__dirname, 'public') });
exports.server.register(fastify_socket_io_1.default);
exports.server.register(productsWebsocket_1.productsWebsocket);
exports.server.register(register_1.register);
exports.server.register(login_1.login);
exports.server.register(auth_1.tokenAuth);
exports.server.get('/', (req, reply) => {
    return reply.sendFile('index.html');
});
