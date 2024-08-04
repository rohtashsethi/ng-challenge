import { createReducer, on, Action } from '@ngrx/store';

import * as RepositoriesActions from './repositories.actions';
import { Repository } from '../models/repositories.models';

export const REPOSITORIES_FEATURE_KEY = 'repositories';

export interface RepositoriesState {
  repositories: Repository[];
  filter: string;
  cursor: string | null,
  hasNextPage: boolean,
  loaded: boolean;
  error?: string | null;
}

export interface RepositoriesPartialState {
  readonly [REPOSITORIES_FEATURE_KEY]: RepositoriesState;
}

export const initialRepositoriesState: RepositoriesState = {
    repositories: [],
    filter: '',
    cursor: null,
    hasNextPage: false,
    loaded: false,
  };

const reducer = createReducer(
  initialRepositoriesState,
  on(RepositoriesActions.loadRepositories, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RepositoriesActions.loadRepositoriesSuccess, (state, { repositories, cursor, hasNextPage }) => ({ 
    ...state,
    repositories: [...state.repositories, ...repositories],
    cursor,
    hasNextPage,
    loaded: true 
  })),
  on(RepositoriesActions.loadRepositoriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RepositoriesActions.filterRepositories, (state, { filter }) => ({
    ...state,
    filter
  }))
);

export function repositoriesReducer(
  state: RepositoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
