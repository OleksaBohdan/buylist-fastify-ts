"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
async function start(PORT) {
    await app_1.server.listen(PORT, '0.0.0.0');
    app_1.server.log.info({}, `Server stared on port: ${PORT}`);
}
start(3000);
