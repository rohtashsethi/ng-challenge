import { Repository } from '@lib/shared/types';
import { createActionGroup, props } from '@ngrx/store';

export const repositoriesActions =  createActionGroup({
  source: 'Repositories',
  events: {
    'Load': props<{ cursor: string | null, limit: number }>(),
    'Load Success': props<{ repositories: Repository[], cursor: string, hasNextPage: boolean }>(),
    'Load Failure': props<{ error: any }>(),
    'Filter': props<{ filter: string }>()
  }
})

