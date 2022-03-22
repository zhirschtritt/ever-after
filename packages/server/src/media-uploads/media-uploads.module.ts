import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from '../prisma';
import { MediaUploadsController } from './media-uploads.controller';

@Module({
  providers: [MediaUploadsController],
  imports: [CloudinaryModule, PrismaModule],
})
export class MediaModule {}
