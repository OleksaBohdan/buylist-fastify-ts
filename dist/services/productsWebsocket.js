"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsWebsocket = void 0;
const Product_1 = require("../models/Product");
const app_1 = require("../app");
const authenticateToken_1 = require("../controllers/authenticateToken");
async function productsWebsocket() {
    app_1.server.ready((e) => {
        if (e)
            throw e;
        app_1.server.io.on('connection', async (socket) => socket.on('add_product', async (data) => {
            (0, authenticateToken_1.authenticateToken)(data.token).then(async (result) => {
                if (!result) {
                    socket.emit('add_product', 'Invalid token');
                    return;
                }
                else {
                    const isProduct = await Product_1.Product.findOne({
                        productName: data.productName,
                        profileId: result.data.profileId,
                    });
                    if (!isProduct) {
                        const product = new Product_1.Product();
                        product.productName = data.productName;
                        product.productCount = data.productCount;
                        product.isNotDone = data.isNotDone;
                        product.profileId = result.data.profileId;
                        try {
                            await product.save();
                            socket.emit('add_product', 'ok');
                        }
                        catch (e) {
                            if (e instanceof Error) {
                                socket.emit('add_product', e.message);
                            }
                        }
                    }
                    else {
                        socket.emit('add_product', `${data.productName}`);
                    }
                }
            });
        }));
        app_1.server.io.on('connection', async (socket) => socket.on('update_products', async (data) => {
            (0, authenticateToken_1.authenticateToken)(data.token).then(async (result) => {
                if (!result) {
                    socket.emit('update_products', 'Invalid token');
                    return;
                }
                else {
                    const profileId = result.data.profileId;
                    console.log('profileId', profileId);
                    const products = await Product_1.Product.find({ profileId: profileId });
                    let productList = [];
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
        }));
        app_1.server.io.on('connection', async (socket) => socket.on('done_products', async (data) => {
            (0, authenticateToken_1.authenticateToken)(data.token).then(async (result) => {
                if (!result) {
                    socket.emit('done_products', 'Invalid token');
                    return;
                }
                else {
                    const profileId = result.data.profileId;
                    const product = await Product_1.Product.findOne({ productName: data.productName, profileId: profileId });
                    product.isNotDone = data.isNotDone;
                    try {
                        await product.save();
                        socket.emit('done_products', data.isNotDone);
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            socket.emit('done_products', e.message);
                        }
                    }
                }
            });
        }));
        app_1.server.io.on('connection', async (socket) => socket.on('delete_products', async (data) => {
            (0, authenticateToken_1.authenticateToken)(data.token).then(async (result) => {
                if (!result) {
                    socket.emit('delete_products', 'Invalid token');
                    return;
                }
                else {
                    const profileId = result.data.profileId;
                    try {
                        await Product_1.Product.deleteMany({ profileId: profileId });
                        socket.emit('delete_products', 'ok');
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            socket.emit('delete_products', e.message);
                        }
                    }
                }
            });
        }));
        app_1.server.io.on('connection', async (socket) => socket.on('delete_product', async (data) => {
            (0, authenticateToken_1.authenticateToken)(data.token).then(async (result) => {
                if (!result) {
                    socket.emit('delete_product', 'Invalid token');
                    return;
                }
                else {
                    const profileId = result.data.profileId;
                    try {
                        await Product_1.Product.findOneAndDelete({ productName: data.productName, profileId: profileId });
                        socket.emit('delete_product', 'ok');
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            socket.emit('delete_product', e.message);
                        }
                    }
                }
            });
        }));
    });
}
exports.productsWebsocket = productsWebsocket;
