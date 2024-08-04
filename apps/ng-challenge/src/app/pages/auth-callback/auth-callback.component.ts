import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  template: ` <p>auth-callback works!</p> `,
  styles: ``,
})
export default class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (queryParamsMap) => {
        const token = queryParamsMap.get('token');
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['', 'home', 'repositories']);
        }
      },
    });
  }
}
