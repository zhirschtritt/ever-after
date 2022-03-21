import { Inject, Injectable } from '@nestjs/common';
import type { UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
import * as path from 'path';
import { CLOUDINARY } from './constants';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CLOUDINARY) private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return await new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload_large(
        path.join(file.destination, file.filename),
        { format: 'mp4', folder: 'ever-after' },
        (err, res) => (err ? reject(err) : resolve(res)),
      );
    });
  }
}
