import { Product } from '../models/Product';
import { server } from '../app';

export async function productsWebsocket() {
  server.ready((err) => {
    if (err) throw err;

    server.io.on('connection', async (socket: any) =>
      socket.on('add_product', async (data: any) => {
        console.log(`got: add_product`);

        const product = new Product();
        product.productName = data.productName;
        product.productName = data.productCount;

        try {
          await product.save();
          socket.emit('add_product', 'ok');
        } catch (e) {
          if (e instanceof Error) {
            socket.emit('add_product', e.message);
          }
          console.log(e);
        }
      })
    );
  });
}
