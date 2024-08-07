import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import { GithubService } from '@lib/core';
import { repositoriesActions } from './repositories.actions';

@Injectable()
export class RepositoriesEffects {
  private actions$ = inject(Actions);
  private githubService = inject(GithubService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repositoriesActions.load),
      switchMap(({ cursor, limit  }) =>
        this.githubService.getRepositories(cursor, limit).pipe(
          map(result => {
            console.log(result);
            return repositoriesActions.loadSuccess({ 
              repositories: result.edges.map(edge => edge.node),
              cursor: result.pageInfo.endCursor,
              hasNextPage: result.pageInfo.hasNextPage
             })
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(repositoriesActions.loadFailure({ error }));
      })
    )
  );
}
