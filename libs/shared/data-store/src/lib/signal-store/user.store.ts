import { tapResponse } from '@ngrx/operators';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { GithubService } from '@lib/core';
import { User } from '@lib/shared/types';

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
  withMethods((state, githubService = inject(GithubService)) => ({
    fetchUser() {
      return githubService.getUserInfo().pipe(
        tapResponse({
          next: user => {
            if (user) {
              patchState(state, { user, loaded: true, error: null });
              return user;
            } else {
              patchState(state, { user: null, loaded: false, error: null })
              return null;
            }
          },
          error: err => console.log(err)
        })
      ).subscribe();
    },
  })),
  withComputed(state => {
    return {
      getCurrentUser: computed(() => {
        return state.user();
      }),
    }
  })
);