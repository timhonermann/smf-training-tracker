import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, map } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { featureRoutes } from '@stt/shared/routing/model';
import { PersonCreationData, PersonData } from '@stt/shared/person/model';
import { PersonApiClient } from '@stt/shared/person/domain';
import { sortPeopleByRoleThenName } from '@stt/shared/person/util';

export const PersonStore = signalStore(
  withEntities<PersonData>(),
  withMethods(
    (
      store,
      personApiClient = inject(PersonApiClient),
      router = inject(Router),
    ) => ({
      _loadPeople: rxMethod<void>(
        exhaustMap(() =>
          personApiClient.getAll().pipe(
            map((people) => sortPeopleByRoleThenName(people)),
            tapResponse({
              next: (people) => patchState(store, setAllEntities(people)),
              error: () => console.error('Error loading people'),
            }),
          ),
        ),
      ),

      create: rxMethod<PersonCreationData>(
        exhaustMap((person) =>
          personApiClient.create(person).pipe(
            tapResponse({
              next: (createdPerson) => {
                patchState(store, setEntity(createdPerson));
                router.navigate([featureRoutes.PERSON]);
              },
              error: () => console.error('Error creating person'),
            }),
          ),
        ),
      ),

      navigateToPersonCreation: () =>
        router.navigate([featureRoutes.PERSON, 'create']),
    }),
  ),
  withHooks({
    onInit: (store) => {
      store._loadPeople();
    },
  }),
);
