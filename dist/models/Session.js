"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    token: {
        type: String,
        require: true,
    },
    lastVisit: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Session = (0, mongoose_1.model)('Session', sessionSchema);
