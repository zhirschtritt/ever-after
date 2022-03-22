import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PRISMA_SERVICE, PrismaService } from '../prisma';

@Controller('media-uploads')
export class MediaUploadsController {
  constructor(
    @InjectPinoLogger(MediaUploadsController.name)
    private readonly logger: PinoLogger,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
  ) {}

  @Get(':id')
  async getUploadById(@Param('id') id: string) {
    return this.prisma.uploads.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp',
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    // @Req() request: Request,
  ) {
    try {
      const res = await this.cloudinaryService.uploadFile(file);

      const mediaUpload = await this.prisma.uploads.create({
        data: {
          cloudinaryPublicId: res.public_id,
          cloudinaryUrl: res.secure_url,
        },
      });

      this.logger.debug({ res }, 'Uploaded file');
      return mediaUpload;
    } catch (error) {
      if (error.http_code) {
        throw new HttpException('Cloudinary upload error', error.http_code);
      }

      throw error;
    }
  }
}
