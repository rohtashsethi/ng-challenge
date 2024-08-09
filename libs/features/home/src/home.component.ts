import { Subscription, tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@lib/shared/layout';
import { User } from '@lib/shared/types';
import { RepositoriesStore, UserStore } from '@lib/shared/data-store';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly userStore = inject(UserStore);
  readonly repositoryStore = inject(RepositoriesStore);

  currentUser$ = computed(() => {
    if (!this.userStore.loaded()) {
      this.userStore.fetchUser();
      this.fetchRepos();
    }
    return this.userStore.getCurrentUser();
  });


  /**
   * Dispaches Load Repository action to store
   *
   * @memberof AppComponent
   */
  fetchRepos(): void {
    this.repositoryStore.load(null, 20);
  }
}
