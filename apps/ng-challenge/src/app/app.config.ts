import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import {
  RepositoriesEffects,
  REPOSITORIES_FEATURE_KEY,
  repositoriesReducer,
} from '@lib/shared/data-store';

import { routes } from './app.routes';
import { graphqlProvider } from './graphql/graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(RepositoriesEffects),
    provideState(
      REPOSITORIES_FEATURE_KEY,
      repositoriesReducer
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
