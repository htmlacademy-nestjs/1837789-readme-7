import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CheckAuthGuard } from '@project/authentication';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsletterRdo } from './newsletter.rdo';
import { NewsletterResponseMessage } from './newsletter.constants';
import { fillDto } from '@project/helpers';

@ApiTags('newsletter')
@Controller()
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) { }

  @ApiResponse({
    type: NewsletterRdo,
    status: HttpStatus.OK,
    description: NewsletterResponseMessage.NewsletterFound
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NewsletterResponseMessage.JwtAuthError
  })
  @UseGuards(CheckAuthGuard)
  @Get('/get-last-newsletter')
  public async getLastNewsletterDate() {
    const entity = await this.newsletterService.getLastNewsletter();
    return fillDto(NewsletterRdo, { ...entity.toPOJO() });
  }
}
