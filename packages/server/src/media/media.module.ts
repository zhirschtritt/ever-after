import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MediaController } from './media.controller';

@Module({
  providers: [MediaController],
  imports: [CloudinaryModule],
})
export class MediaModule {}
