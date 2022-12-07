import { server } from '../app';
import { FastifyRequest, FastifyReply } from 'fastify';
import { authenticateToken } from '../controllers/authenticateToken';

export async function tokenAuth() {
  server.get('/api/auth', (request: FastifyRequest, reply: FastifyReply) => {
    console.log('Authenticate');
    const token: any = request.headers.token;
    console.log(token);

    authenticateToken(token).then((result: any) => {
      if (!result) {
        console.log(`result ${result}`);
        reply.status(404);
        reply.send('Invalid token');
      } else {
        console.log(`result ${result.data.profileId}`);
        reply.status(200);
        reply.send('ok');
      }
    });
  });
}
