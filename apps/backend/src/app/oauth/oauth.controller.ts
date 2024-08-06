import { Controller, Get, Query, Res } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
@Controller('auth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('callback')
  async oauthCallback(@Query('code') code: string, @Res() res: Response) {
    const token = await firstValueFrom(this.oauthService.getAccessToken(code));
    res.redirect(`http://localhost:4200/callback?token=${token}`);
  }
}
