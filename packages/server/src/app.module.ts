import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaController } from './media/media.controller';
import { MediaModule } from './media/media.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    MediaModule,
    CloudinaryModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    LoggerModule.forRoot({ pinoHttp: { autoLogging: false, level: 'debug' } }),
  ],
  controllers: [AppController, MediaController],
  providers: [AppService],
})
export class AppModule {}
