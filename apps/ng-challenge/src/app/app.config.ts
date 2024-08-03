import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql/graphql.provider';
import { provideEffects } from '@ngrx/effects';
import * as fromRepositories from './store/repositories.reducer';
import { RepositoriesEffects } from './store/repositories.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(RepositoriesEffects),
    provideState(
      fromRepositories.REPOSITORIES_FEATURE_KEY,
      fromRepositories.repositoriesReducer
    ),
    provideEffects(),
    provideStore(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(),
    graphqlProvider,
  ],
};
