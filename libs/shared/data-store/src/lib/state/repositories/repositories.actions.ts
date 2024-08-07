import { Repository } from '@lib/shared/types';
import { createAction, props } from '@ngrx/store';

export const loadRepositories = createAction(
  '[Repositories/API] Load Repositories',
  props<{ cursor: string | null, limit: number }>()
);

export const loadRepositoriesSuccess = createAction(
  '[Repositories/API] Load Repositories Success',
  props<{ repositories: Repository[], cursor: string, hasNextPage: boolean }>()
);

export const loadRepositoriesFailure = createAction(
  '[Repositories/API] Load Repositories Failure',
  props<{ error: any }>()
);

export const filterRepositories = createAction(
  '[Repositories] Filter Repositories',
  props<{ filter: string }>()
);

