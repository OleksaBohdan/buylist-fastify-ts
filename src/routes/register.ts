import { server } from '../app';
import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/User';
import S from 'fluent-json-schema';

// const bodyJsonSchema = S.object().prop('homeName', S.string()).prop('email', S.string()).prop('password', S.string());
// export const registerSchema = {
//   $id: 'registerSchema',
//   body: bodyJsonSchema,
// };

interface IRegisterCredentials {
  homeName: string;
  email: string;
  password: boolean;
}

export async function register() {
  server.post('/api/register', async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('Register');
    const credentials: IRegisterCredentials = request.body as IRegisterCredentials;

    reply.status(200);
  });
}
