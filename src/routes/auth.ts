import { server } from '../app';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function tokenAuth() {
  server.get('/api/auth', (request: FastifyRequest, reply: FastifyReply) => {
    console.log('Authenticate');
    console.log(request.headers.token);
    reply.status(200);
    reply.send('ok');
  });
}
