import { Subscription, tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../models/user.models';
import { HeaderComponent } from './../../layout/header/header.component';
import * as RepositoryActions from './../../store/repositories.actions';
import { UserStore } from './../../signal-store/user.store';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements OnInit, OnDestroy {
  user: User | null = null;
  readonly userStore = inject(UserStore);
  userSub$!: Subscription;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    if (!this.userStore.loaded()) {
      this.userSub$ = this.userStore.fetchUser().pipe(tap(user => {
        if (user) {
          this.user = user;
          this.fetchRepos()
        }
      })).subscribe();
    } else {
      this.user = this.userStore.user();
    }
  }

  /**
   * Dispaches Load Repository action to store
   *
   * @memberof AppComponent
   */
  fetchRepos(): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ cursor: null, limit: 20 })
    );
  }

  ngOnDestroy(): void {
    this.userSub$?.unsubscribe();
  }
}
