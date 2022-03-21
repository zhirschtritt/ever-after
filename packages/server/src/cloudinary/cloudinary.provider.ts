import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Configuration } from '../config/configuration';
import { CLOUDINARY } from './constants';

type CloudinaryConfig = Configuration['cloudinary'];

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (config: ConfigService): typeof cloudinary => {
    cloudinary.config({
      cloud_name: config.get<CloudinaryConfig['cloud_name']>(
        'cloudinary.cloud_name',
      ),
      api_key: config.get<CloudinaryConfig['api_key']>('cloudinary.api_key'),
      api_secret: config.get<CloudinaryConfig['api_secret']>(
        'cloudinary.api_secret',
      ),
    });

    return cloudinary;
  },
  inject: [ConfigService],
};
