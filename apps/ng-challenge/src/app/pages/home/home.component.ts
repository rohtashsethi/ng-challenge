import { UserStore } from './../../signal-store/user.store';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { compose, Store } from '@ngrx/store';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { User } from '../../models/user.models';
import { HeaderComponent } from './../../layout/header/header.component';
import * as RepositoryActions from './../../store/repositories.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements OnInit {
  user: User | null = null;
  readonly userStore = inject(UserStore);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    if (!this.userStore.loaded()) {
      this.getUserInfo();
      console.log('jiaaaa');
    } else {
      this.user = this.userStore.user();
    }
  }

  /**
   * Dispaches Load Repository action to store
   *
   * @memberof AppComponent
   */
  fetchRepos(login: string): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ cursor: '', limit: 20 })
    );
  }

  getUserInfo() {
    this.userStore.fetchUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.fetchRepos(user.login);
        }
      },
    });
  }
}
