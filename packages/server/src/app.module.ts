import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import configuration from './config/configuration';
import { MediaUploadsController } from './media-uploads/media-uploads.controller';
import { MediaModule } from './media-uploads/media-uploads.module';
import { PrismaModule } from './prisma';

@Module({
  imports: [
    MediaModule,
    CloudinaryModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    LoggerModule.forRoot({ pinoHttp: { autoLogging: false, level: 'debug' } }),
    PrismaModule,
  ],
  controllers: [AppController, MediaUploadsController],
  providers: [AppService],
})
export class AppModule {}
