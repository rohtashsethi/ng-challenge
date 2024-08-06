import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OauthService {
  private baseURL = 'https://github.com/login/oauth/access_token';
  private clientID = 'Ov23liGtA2tZ05i8X3MB';

  constructor(private httpService: HttpService, private configService: ConfigService ) {}

  getAccessToken(code: string): Observable<string> {
    return this.httpService.post(this.baseURL, {
      client_id: this.clientID,
      client_secret: this.getClientSecret(),
      code,
    }, {
      headers: { accept: 'application/json' }
    }).pipe(
      map((response: AxiosResponse) => response.data.access_token)
    );
  }

  getClientSecret(): string {
    return this.configService.get<string>('CLIENT_SECRET') ?? '';
  }
}
