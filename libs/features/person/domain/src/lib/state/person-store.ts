import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { PersonData } from '@stt/features/person/model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { inject } from '@angular/core';
import { PersonApiClient } from '../services/person-api-client';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { featureRoutes } from '@stt/shared/routing/model';

export const PersonStore = signalStore(
  withEntities<PersonData>(),
  withMethods(
    (
      store,
      personApiClient = inject(PersonApiClient),
      router = inject(Router)
    ) => ({
      _loadPeople: rxMethod<void>(
        exhaustMap(() =>
          personApiClient.getAll().pipe(
            tapResponse({
              next: (people) => patchState(store, setAllEntities(people)),
              error: () => console.error('Error loading people'),
            })
          )
        )
      ),

      create: rxMethod<PersonData>(
        exhaustMap((person) =>
          personApiClient.create(person).pipe(
            tapResponse({
              next: (createdPerson) => {
                patchState(store, setEntity(createdPerson));
                router.navigate([featureRoutes.PERSON]);
              },
              error: () => console.error('Error creating person'),
            })
          )
        )
      ),

      navigateToPersonCreation: () =>
        router.navigate([featureRoutes.PERSON, 'create']),
    })
  ),
  withHooks({
    onInit: (store) => {
      store._loadPeople();
    },
  })
);
