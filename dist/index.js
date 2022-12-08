"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const mongoose_1 = require("mongoose");
async function start(url) {
    try {
        await (0, mongoose_1.connect)(url).then(() => {
            runServer(config_1.PORT);
        });
        app_1.server.log.info({}, `BD connected to ${url}`);
    }
    catch (err) {
        if (err instanceof mongoose_1.Error) {
            app_1.server.log.error(err, err.message);
        }
    }
}
async function runServer(PORT) {
    try {
        await app_1.server.listen(PORT, '0.0.0.0');
        app_1.server.log.info({}, `Server stared on port: ${PORT}`);
    }
    catch (err) {
        if (err instanceof mongoose_1.Error) {
            app_1.server.log.error(err, err.message);
            process.exit(1);
        }
    }
}
start(config_1.BD);
