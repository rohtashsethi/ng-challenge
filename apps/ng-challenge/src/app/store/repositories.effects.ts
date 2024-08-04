import { GithubService } from './../services/github.service';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as RepositoriesActions from './repositories.actions';

@Injectable()
export class RepositoriesEffects {
  private actions$ = inject(Actions);
  private githubService = inject(GithubService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoriesActions.loadRepositories),
      switchMap(({ cursor, limit  }) =>
        this.githubService.getRepositories(cursor, limit).pipe(
          map(result => {
            console.log(result);
            return RepositoriesActions.loadRepositoriesSuccess({ 
              repositories: result.edges.map(edge => edge.node),
              cursor: result.pageInfo.endCursor,
              hasNextPage: result.pageInfo.hasNextPage
             })
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(RepositoriesActions.loadRepositoriesFailure({ error }));
      })
    )
  );
}
