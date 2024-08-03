import { createAction, props } from '@ngrx/store';
import { Repository } from '../models/repositories.models';

export const loadRepositories = createAction(
  '[Repositories/API] Load Repositories',
  props<{ login: string }>()
);

export const loadRepositoriesSuccess = createAction(
  '[Repositories/API] Load Repositories Success',
  props<{ repositories: Repository[] }>()
);

export const loadRepositoriesFailure = createAction(
  '[Repositories/API] Load Repositories Failure',
  props<{ error: any }>()
);

export const filterRepositories = createAction(
  '[Repositories/API] Filter Repositories',
  props<{ filter: string }>()
);
