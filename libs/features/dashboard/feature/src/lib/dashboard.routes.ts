import { Routes } from '@angular/router';
import { Dashboard } from './container/dashboard/dashboard';
import { TrainingRequirement } from './container/training-requirement/training-requirement';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'training-requirement',
    component: TrainingRequirement,
  },
];
