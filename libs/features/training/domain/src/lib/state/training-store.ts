import { signalStore, withMethods } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { featureRoutes } from '@stt/shared/routing/model';

export const TrainingStore = signalStore(
  withMethods((store, router = inject(Router)) => ({
    navigateToTrainingLocations: () =>
      router.navigate([featureRoutes.TRAINING, 'location']),

    navigateToTrainingCreation: () =>
      router.navigate([featureRoutes.TRAINING, 'create']),
  }))
);
