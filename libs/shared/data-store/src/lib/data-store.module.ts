import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromRepositories from './state/repositories/repositories.reducer';
import { RepositoriesEffects } from './state/repositories/repositories.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromRepositories.REPOSITORIES_FEATURE_KEY,
      fromRepositories.repositoriesReducer
    ),
    EffectsModule.forFeature(RepositoriesEffects)
  ],
})
export class DataStoreModule {}
