import { server } from './app';
import { PORT, BD } from './config/config';
import { Schema, model, connect, Error } from 'mongoose';

async function start(url: string) {
  try {
    await connect(url).then(() => {
      runServer(PORT);
    });
    server.log.info({}, `BD connected to ${url}`);
  } catch (err) {
    if (err instanceof Error) {
      server.log.error(err, err.message);
    }
  }
}

async function runServer(PORT: number) {
  try {
    await server.listen(PORT, '0.0.0.0');
    server.log.info({}, `Server stared on port: ${PORT}`);
  } catch (err) {
    if (err instanceof Error) {
      server.log.error(err, err.message);
      process.exit(1);
    }
  }
}

start(BD);
