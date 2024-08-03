import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RepositoriesActions from './repositories.actions';
import { RepositoriesEffects } from './repositories.effects';

describe('RepositoriesEffects', () => {
  let actions: Observable<Action>;
  let effects: RepositoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RepositoriesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RepositoriesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RepositoriesActions.initRepositories() });

      const expected = hot('-a-|', {
        a: RepositoriesActions.loadRepositoriesSuccess({ repositories: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
