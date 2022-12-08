"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    profileId: { type: String },
    productName: { type: String, required: true, unique: true },
    productCount: { type: String },
    isNotDone: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
