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
  password: string;
}

export async function register() {
  server.post('/api/register', async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('Register');
    const credentials: IRegisterCredentials = request.body as IRegisterCredentials;

    const userID = (await User.count()) + 1;

    const user = new User({
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
    } catch (e) {
      if (e instanceof Error) {
        reply.status(200);
        reply.send({ body: e.message });
        return;
      }
    }
  });
}
