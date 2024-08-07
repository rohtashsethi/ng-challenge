import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GITHUB_OAUTH_APP } from '@lib/shared/config';

@Component({
  selector: 'lib-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  githubOauthUrl: string;

  constructor(private router: Router) {
    const config = GITHUB_OAUTH_APP;
    this.githubOauthUrl = `${config.URI}?client_id=${config.CLIENT_ID}&scope=${config.SCOPE}`;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home/repositories']);
    }
  }
}
