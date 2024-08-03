import { Action } from '@ngrx/store';

import * as RepositoriesActions from './repositories.actions';
import { RepositoriesEntity } from './repositories.models';
import {
  RepositoriesState,
  initialRepositoriesState,
  repositoriesReducer,
} from './repositories.reducer';

describe('Repositories Reducer', () => {
  const createRepositoriesEntity = (
    id: string,
    name = ''
  ): RepositoriesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Repositories actions', () => {
    it('loadRepositoriesSuccess should return the list of known Repositories', () => {
      const repositories = [
        createRepositoriesEntity('PRODUCT-AAA'),
        createRepositoriesEntity('PRODUCT-zzz'),
      ];
      const action = RepositoriesActions.loadRepositoriesSuccess({
        repositories,
      });

      const result: RepositoriesState = repositoriesReducer(
        initialRepositoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = repositoriesReducer(initialRepositoriesState, action);

      expect(result).toBe(initialRepositoriesState);
    });
  });
});
