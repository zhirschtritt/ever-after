"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const constants_1 = require("./constants");
exports.CloudinaryProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: (config) => {
        cloudinary_1.v2.config({
            cloud_name: config.get('cloudinary.cloud_name'),
            api_key: config.get('cloudinary.api_key'),
            api_secret: config.get('cloudinary.api_secret'),
        });
        return cloudinary_1.v2;
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=cloudinary.provider.js.map