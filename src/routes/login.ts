import { server } from '../app';
import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/User';
import { createSession } from '../controllers/createSession';

interface ILoginCredentials {
  homeName: string;
  password: string;
}

export async function login() {
  server.post('/api/login', async (request: FastifyRequest, reply: FastifyReply) => {
    // console.log('Login');
    const credentials: ILoginCredentials = request.body as ILoginCredentials;

    const user = await User.findOne({ homeName: credentials.homeName });

    if (!user) {
      // console.log('Cheking user');
      reply.status(404);
      // reply.send('User not found');
      return;
    }

    if (await user.checkPassword(credentials.password)) {
      reply.status(200);
      // console.log('Password correct... Logining');
      const token = await createSession(user);
      console.log(token);
      reply.headers({ token: token, homename: credentials.homeName });
      return;
    } else {
      reply.status(401);
    }

    // console.log(`user \n ${credentials.homeName} ${credentials.password}`);
  });
}
