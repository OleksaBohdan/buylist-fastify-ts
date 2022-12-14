import { Product } from '../models/Product';
import { server } from '../app';
import { authenticateToken } from '../controllers/authenticateToken';

export async function productsWebsocket() {
  server.ready((e) => {
    if (e) throw e;
    server.io.on('connection', async (socket: any) =>
      socket.on('add_product', async (data: any) => {
        authenticateToken(data.token).then(async (result: any) => {
          if (!result) {
            socket.emit('add_product', 'Invalid token');
            return;
          } else {
            const isProduct = await Product.findOne({
              productName: data.productName,
              profileId: result.data.profileId,
            });

            if (!isProduct) {
              const product = new Product();
              product.productName = data.productName;
              product.productCount = data.productCount;
              product.isNotDone = data.isNotDone;
              product.profileId = result.data.profileId;
              try {
                await product.save();
                socket.emit('add_product', 'ok');
              } catch (e) {
                if (e instanceof Error) {
                  socket.emit('add_product', e.message);
                }
              }
            } else {
              socket.emit('add_product', `${data.productName}`);
            }
          }
        });
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('update_products', async (data: any) => {
        authenticateToken(data.token).then(async (result: any) => {
          if (!result) {
            socket.emit('update_products', 'Invalid token');
            return;
          } else {
            const profileId = result.data.profileId;
            console.log('profileId', profileId);
            const products = await Product.find({ profileId: profileId });
            let productList: any = [];
            products.forEach((product) => {
              productList.push({
                productName: product.productName,
                productCount: product.productCount,
                isNotDone: product.isNotDone,
              });
            });
            socket.emit('update_products', productList);
          }
        });
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('done_products', async (data: any) => {
        authenticateToken(data.token).then(async (result: any) => {
          if (!result) {
            socket.emit('done_products', 'Invalid token');
            return;
          } else {
            const profileId = result.data.profileId;
            const product: any = await Product.findOne({ productName: data.productName, profileId: profileId });
            product.isNotDone = data.isNotDone;
            try {
              await product.save();
              socket.emit('done_products', data.isNotDone);
            } catch (e) {
              if (e instanceof Error) {
                socket.emit('done_products', e.message);
              }
            }
          }
        });
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('delete_products', async (data: any) => {
        authenticateToken(data.token).then(async (result: any) => {
          if (!result) {
            socket.emit('delete_products', 'Invalid token');
            return;
          } else {
            const profileId = result.data.profileId;
            try {
              await Product.deleteMany({ profileId: profileId });
              socket.emit('delete_products', 'ok');
            } catch (e) {
              if (e instanceof Error) {
                socket.emit('delete_products', e.message);
              }
            }
          }
        });
      })
    );

    server.io.on('connection', async (socket: any) =>
      socket.on('delete_product', async (data: any) => {
        authenticateToken(data.token).then(async (result: any) => {
          if (!result) {
            socket.emit('delete_product', 'Invalid token');
            return;
          } else {
            const profileId = result.data.profileId;
            try {
              await Product.findOneAndDelete({ productName: data.productName, profileId: profileId });
              socket.emit('delete_product', 'ok');
            } catch (e) {
              if (e instanceof Error) {
                socket.emit('delete_product', e.message);
              }
            }
          }
        });
      })
    );
  });
}
