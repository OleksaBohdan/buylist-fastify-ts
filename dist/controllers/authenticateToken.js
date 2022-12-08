"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
async function authenticateToken(token) {
    const result = jsonwebtoken_1.default.verify(token, config_1.secretJwt, function (err, decoded) {
        if (err) {
            console.log(`token invalid ${token}`);
            return false;
        }
        else {
            console.log('token valid');
            return decoded;
        }
    });
    return result;
}
exports.authenticateToken = authenticateToken;
