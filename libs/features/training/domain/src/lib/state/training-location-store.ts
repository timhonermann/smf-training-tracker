import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import {
  TrainingLocationCreationData,
  TrainingLocationData,
} from '@stt/features/training/model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { inject } from '@angular/core';
import { TrainingLocationApiClient } from '../service/training-location-api-client';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { featureRoutes } from '@stt/shared/routing/model';

export type TrainingLocationStore = InstanceType<typeof TrainingLocationStore>;

export const TrainingLocationStore = signalStore(
  withEntities<TrainingLocationData>(),
  withMethods(
    (
      store,
      trainingLocationApiClient = inject(TrainingLocationApiClient),
      router = inject(Router),
    ) => ({
      _loadAll: rxMethod<void>(
        exhaustMap(() =>
          trainingLocationApiClient.getAll().pipe(
            tapResponse({
              next: (trainingLocations) =>
                patchState(store, setAllEntities(trainingLocations)),
              error: () => console.error('Error loading training locations'),
            }),
          ),
        ),
      ),

      create: rxMethod<TrainingLocationCreationData>(
        exhaustMap((trainingLocationCreationData) =>
          trainingLocationApiClient.create(trainingLocationCreationData).pipe(
            tapResponse({
              next: (trainingLocation) => {
                patchState(store, setEntity(trainingLocation));
                router.navigate([featureRoutes.TRAINING, 'location']);
              },
              error: () => console.error('Error creating training location'),
            }),
          ),
        ),
      ),

      navigateToTrainingLocationCreation: () =>
        router.navigate([featureRoutes.TRAINING, 'location', 'create']),
    }),
  ),
  withHooks({
    onInit: (store) => {
      store._loadAll();
    },
  }),
);
