import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { Repositories, Repository } from '@lib/shared/types';
import { BarChartItem } from '@lib/barchart';
import { GithubService } from '@lib/core';
import { initialRepositoriesState } from '../state/repositories/repositories.reducer';
import { debounceTime, distinctUntilChanged, pipe, switchMap } from 'rxjs';

export const RepositoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialRepositoriesState),
  withMethods(state => {
    const githubService = inject(GithubService);

    return {

      rxLoad: rxMethod<[string | null, number]>(
        pipe(
          debounceTime(600),
          distinctUntilChanged(),
          switchMap(([cursor, limit]) => githubService.getRepositories(cursor, limit)),
          tapResponse({
            next: (response: Repositories) => patchState(state, { 
              repositories: [...state.repositories(), ...response.edges.map(edge => edge.node)],
              cursor: response.pageInfo.endCursor,
              hasNextPage: response.pageInfo.hasNextPage,
            }),
            error: err => console.log(err)
          })
        )
      ),
      load(cursor: string | null, limit: number): void {
        githubService.getRepositories(cursor, limit).pipe(
          tapResponse({
            next: (response: Repositories) => patchState(state, { 
              repositories: cursor ? [...state.repositories(), ...response.edges.map(edge => edge.node)]: response.edges.map(edge => edge.node),
              cursor: response.pageInfo.endCursor,
              hasNextPage: response.pageInfo.hasNextPage
            }),
            error: err => console.log(err)
          })
        ).subscribe();
      },
      setFilter(filter: string): void {
        patchState(state, { filter });
      }
    }
  }),
  withComputed(state => {
    const filter = (repos: Repository[], filter: string) => {
      return filter ? repos.filter(repo => (`${repo.name} ${repo.description}`).includes(filter)) : repos;
    };

    return {
      getRepositories: computed(() => {
        return {
          repositories: filter(state.repositories(), state.filter()),
          cursor: state.cursor(),
          hasNextPage: state.hasNextPage()
        }
      }),
      getTopRepositories: computed(() => {
        return state.repositories().slice(0, 10).map(repo => ({
          name: repo.name, value: repo.stargazerCount
        }) as BarChartItem);
      })
    }
  })
);

