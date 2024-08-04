import { inject } from '@angular/core';
import { User } from './../models/user.models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GithubService } from '../services/github.service';
import { map, switchMap, tap } from 'rxjs';
import { Observable } from '@apollo/client/utilities';

type CurrentUserState = {
  user: User | null;
  loaded: boolean;
  error: string | null;
};

const initialState: CurrentUserState = {
  user: null,
  loaded: false,
  error: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, githubService = inject(GithubService)) => ({
    fetchUser() {
      return githubService.getUserInfo().pipe(
        map(user => {
          if (user) {
            patchState(store, { user, loaded: true, error: null });
            return user;
          } else {
            patchState(store, { user: null, loaded: false, error: null })
            return null;
          }
        })
      )
    },
  }))
);