import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GITHUB_OAUTH_APP } from '../../configs/oauth.config';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AuthComponent {
  githubOauthUrl: string;

  constructor() {
    const config = GITHUB_OAUTH_APP;
    this.githubOauthUrl = `${config.URI}?client_id=${config.CLIENT_ID}&scope=${config.SCOPE}`;
  }
}
