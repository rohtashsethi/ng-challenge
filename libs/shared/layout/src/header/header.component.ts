import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '@lib/shared/types';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() user: User | null = null;
  pages = [
   // { title: 'Home', route: '/home' },
    { title: 'Repositories', route: 'repositories' },
    { title: 'Report', route: 'report'}
  ];

  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
