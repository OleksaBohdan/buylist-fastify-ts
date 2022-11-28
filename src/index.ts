import { server } from './app';
import { PORT } from './config/config';

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

runServer(PORT);
