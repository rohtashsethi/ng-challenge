import { createReducer, on, Action } from '@ngrx/store';
import { Repository } from '@lib/shared/types';
import { repositoriesActions } from './repositories.actions';
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
  on(repositoriesActions.load, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(repositoriesActions.loadSuccess, (state, { repositories, cursor, hasNextPage }) => ({ 
    ...state,
    repositories: [...state.repositories, ...repositories],
    cursor,
    hasNextPage,
    loaded: true 
  })),
  on(repositoriesActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(repositoriesActions.filter, (state, { filter }) => ({
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
