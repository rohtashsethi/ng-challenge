import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class OauthService {
  private baseURL = 'https://github.com/login/oauth/access_token';
  private clientID = 'Ov23liGtA2tZ05i8X3MB';
  private clientSecret = '8cd17def8872582e355058733415a382913367e5';

  constructor(private httpService: HttpService) {}

  getAccessToken(code: string): Observable<string> {
    const url = `${this.baseURL}?client_id=${this.clientID}&client_secret=${this.clientSecret}&code=${code}`;
    return this.httpService.post(url, {}, {
      headers: { accept: 'application/json' }
    }).pipe(
      map((response: AxiosResponse) => response.data.access_token)
    );
  }
}
