"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretJwt = exports.digest = exports.iterations = exports.length = exports.BD = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.BD = process.env.DB || 'mongodb://127.0.0.1:27017/buylist-ts-2';
exports.length = 128;
exports.iterations = 12000;
exports.digest = 'sha512';
exports.secretJwt = 'hommy!';
