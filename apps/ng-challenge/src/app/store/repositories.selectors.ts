import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REPOSITORIES_FEATURE_KEY,
  RepositoriesState,
} from './repositories.reducer';

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

export const selectRepositories = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) =>
    state.filter
      ? state.repositories.filter((repo) =>
          repo.name.concat(repo.description).includes(state.filter)
        )
      : state.repositories
);
