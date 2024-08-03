import { RepositoriesEntity } from './repositories.models';
import {
  repositoriesAdapter,
  RepositoriesPartialState,
  initialRepositoriesState,
} from './repositories.reducer';
import * as RepositoriesSelectors from './repositories.selectors';

describe('Repositories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRepositoriesId = (it: RepositoriesEntity) => it.id;
  const createRepositoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RepositoriesEntity);

  let state: RepositoriesPartialState;

  beforeEach(() => {
    state = {
      repositories: repositoriesAdapter.setAll(
        [
          createRepositoriesEntity('PRODUCT-AAA'),
          createRepositoriesEntity('PRODUCT-BBB'),
          createRepositoriesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialRepositoriesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Repositories Selectors', () => {
    it('selectAllRepositories() should return the list of Repositories', () => {
      const results = RepositoriesSelectors.selectAllRepositories(state);
      const selId = getRepositoriesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = RepositoriesSelectors.selectEntity(
        state
      ) as RepositoriesEntity;
      const selId = getRepositoriesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectRepositoriesLoaded() should return the current "loaded" status', () => {
      const result = RepositoriesSelectors.selectRepositoriesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectRepositoriesError() should return the current "error" state', () => {
      const result = RepositoriesSelectors.selectRepositoriesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
