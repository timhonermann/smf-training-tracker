import { Routes } from '@angular/router';
import { TrainingCreation } from './container/training-creation/training-creation';
import { TrainingLocationCreation } from './container/training-location-creation/training-location-creation';
import { TrainingLocationList } from './container/training-location-list/training-location-list';
import { TrainingList } from './container/training-list/training-list';
import {
  TrainingLocationStore,
  TrainingStore,
} from '@stt/features/training/domain';

export const routes: Routes = [
  {
    path: '',
    providers: [TrainingStore, TrainingLocationStore],
    children: [
      {
        path: '',
        component: TrainingList,
      },
      {
        path: 'create',
        component: TrainingCreation,
      },
      {
        path: 'location',
        children: [
          {
            path: '',
            component: TrainingLocationList,
          },
          {
            path: 'create',
            component: TrainingLocationCreation,
          },
        ],
      },
    ],
  },
];
