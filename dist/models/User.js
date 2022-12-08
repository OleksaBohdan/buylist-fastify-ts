"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config/config");
const userSchema = new mongoose_1.Schema({
    homeName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profileId: { type: String },
    passwordHash: { type: String },
    salt: { type: String },
}, {
    timestamps: true,
});
function generatePassword(salt, password) {
    return new Promise((resolve, reject) => {
        crypto_1.default.pbkdf2(password, salt, config_1.iterations, config_1.length, config_1.digest, (err, key) => {
            if (err)
                return reject(err);
            resolve(key.toString('hex'));
        });
    });
}
function generateSalt() {
    return new Promise((resolve, reject) => {
        crypto_1.default.randomBytes(config_1.length, (err, buffer) => {
            if (err)
                return reject(err);
            resolve(buffer.toString('hex'));
        });
    });
}
userSchema.methods.setPassword = async function setPassword(password) {
    this.salt = await generateSalt();
    this.passwordHash = await generatePassword(this.salt, password);
};
userSchema.methods.checkPassword = async function (password) {
    if (!password)
        return false;
    const hash = await generatePassword(this.salt, password);
    return hash === this.passwordHash;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
