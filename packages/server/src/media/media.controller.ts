import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response, Request } from 'express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Controller('media')
export class MediaController {
  constructor(
    @InjectPinoLogger(MediaController.name) private readonly logger: PinoLogger,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const res = await this.cloudinaryService.uploadFile(file);

      this.logger.debug({ res }, 'Uploaded file');
      return res;
    } catch (error) {
      if (error.http_code) {
        response.status(error.http_code);
      }

      throw error;
    }
  }
}
