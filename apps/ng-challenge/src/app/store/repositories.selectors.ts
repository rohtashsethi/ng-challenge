import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REPOSITORIES_FEATURE_KEY,
  RepositoriesState,
} from './repositories.reducer';
import { BarChartItem } from 'barchart';

// Lookup the 'Repositories' feature state managed by NgRx
export const selectRepositoriesState = createFeatureSelector<RepositoriesState>(
  REPOSITORIES_FEATURE_KEY
);

export const selectRepositoriesLoaded = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.loaded
);

export const selectRepositoriesError = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.error
);

export const selectRepositoriesCursor = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.cursor
);

export const selectRepositoriesHasNextPage = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.hasNextPage
);

export const selectRepositories = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) =>
    state.filter
      ? state.repositories.filter((repo) =>
          repo.name.concat(repo.description).includes(state.filter)
        )
      : state.repositories
);

export const selectStarInfo = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.repositories.slice(0, 10).map((repo) => ({ name: repo.name, value: repo.stargazerCount } as BarChartItem))
);
