import { Product } from '../models/Product';
import { server } from '../app';

export async function productsWebsocket() {
  server.ready((e) => {
    if (e) throw e;
    server.io.on('connection', async (socket: any) =>
      socket.on('add_product', async (data: any) => {
        const product = new Product();
        product.productName = data.productName;
        product.productCount = data.productCount;
        product.isNotDone = data.isNotDone;
        try {
          await product.save();
          socket.emit('add_product', 'ok');
        } catch (e) {
          if (e instanceof Error) {
            socket.emit('add_product', e.message);
          }
        }
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('update_products', async (data: any) => {
        const products = await Product.find();
        let productList: any = [];
        products.forEach((product) => {
          productList.push({
            productName: product.productName,
            productCount: product.productCount,
            isNotDone: product.isNotDone,
          });
        });
        socket.emit('update_products', productList);
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('done_products', async (data: any) => {
        const product: any = await Product.findOne({ productName: data.productName });
        product.isNotDone = data.isNotDone;
        try {
          await product.save();
          socket.emit('done_products', data.isNotDone);
        } catch (e) {
          if (e instanceof Error) {
            socket.emit('done_products', e.message);
          }
        }
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('delete_products', async (data: any) => {
        if (data == 'deleteAll') {
          try {
            await Product.deleteMany();
            socket.emit('delete_products', 'ok');
          } catch (e) {
            if (e instanceof Error) {
              socket.emit('delete_products', e.message);
            }
          }
        }
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('delete_product', async (data: any) => {
        try {
          await Product.findOneAndDelete({ productName: data.productName });
          socket.emit('delete_product', 'ok');
        } catch (e) {
          if (e instanceof Error) {
            socket.emit('delete_product', e.message);
          }
        }
      })
    );
  });
}
