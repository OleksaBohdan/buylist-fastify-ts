import Fastify, { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply } from 'fastify';
import FastifyStaticPlugin from '@fastify/static';
import socket from 'fastify-socket.io';
import { productsWebsocket } from './services/productsWebsocket';
import { register } from './routes/register';
import { login } from './routes/login';
import { tokenAuth } from './routes/auth';
import path from 'path';

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

export const server: FastifyInstance = Fastify({ logger: envToLogger.development });

server.register(FastifyStaticPlugin, { root: path.join(__dirname, 'public') });
server.register(socket);
server.register(productsWebsocket);
server.register(register);
server.register(login);
server.register(tokenAuth);

server.get('/', (req: FastifyRequest, reply: FastifyReply) => {
  return reply.sendFile('index.html');
});
