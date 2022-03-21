/// <reference types="multer" />
import { Response, Request } from 'express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PinoLogger } from 'nestjs-pino';
export declare class MediaController {
    private readonly logger;
    private readonly cloudinaryService;
    constructor(logger: PinoLogger, cloudinaryService: CloudinaryService);
    create(file: Express.Multer.File, request: Request, response: Response): Promise<import("cloudinary").UploadApiResponse>;
}
