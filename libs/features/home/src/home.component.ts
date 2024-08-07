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
import { HeaderComponent } from '@lib/shared/layout';
import { User } from '@lib/shared/types';
import { UserStore, loadRepositories } from '@lib/shared/data-store';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
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
      loadRepositories({ cursor: null, limit: 20 })
    );
  }

  ngOnDestroy(): void {
    this.userSub$?.unsubscribe();
  }
}
