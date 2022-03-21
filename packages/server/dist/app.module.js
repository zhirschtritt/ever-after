"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const media_controller_1 = require("./media/media.controller");
const media_module_1 = require("./media/media.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const nestjs_pino_1 = require("nestjs-pino");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            media_module_1.MediaModule,
            cloudinary_module_1.CloudinaryModule,
            config_1.ConfigModule.forRoot({ load: [configuration_1.default], isGlobal: true }),
            nestjs_pino_1.LoggerModule.forRoot({ pinoHttp: { autoLogging: false, level: 'debug' } }),
        ],
        controllers: [app_controller_1.AppController, media_controller_1.MediaController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map