/// <reference types="multer" />
import type { UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
export declare class CloudinaryService {
    private readonly cloudinary;
    constructor(cloudinary: typeof Cloudinary);
    uploadFile(file: Express.Multer.File): Promise<UploadApiResponse>;
}
