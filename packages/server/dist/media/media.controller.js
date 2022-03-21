"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MediaController_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const express_1 = require("express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const nestjs_pino_1 = require("nestjs-pino");
let MediaController = MediaController_1 = class MediaController {
    constructor(logger, cloudinaryService) {
        this.logger = logger;
        this.cloudinaryService = cloudinaryService;
    }
    async create(file, request, response) {
        try {
            const res = await this.cloudinaryService.uploadFile(file);
            this.logger.debug({ res }, 'Uploaded file');
            return res;
        }
        catch (error) {
            if (error.http_code) {
                response.status(error.http_code);
            }
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './tmp',
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "create", null);
MediaController = MediaController_1 = __decorate([
    (0, common_1.Controller)('media'),
    __param(0, (0, nestjs_pino_1.InjectPinoLogger)(MediaController_1.name)),
    __metadata("design:paramtypes", [typeof (_e = typeof nestjs_pino_1.PinoLogger !== "undefined" && nestjs_pino_1.PinoLogger) === "function" ? _e : Object, cloudinary_service_1.CloudinaryService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map