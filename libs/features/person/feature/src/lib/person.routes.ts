import { Routes } from '@angular/router';
import { PersonList } from './container/person-list/person-list';
import { PersonCreation } from './container/person-creation/person-creation';

export const routes: Routes = [
  {
    path: '',
    component: PersonList,
  },
  {
    path: 'create',
    component: PersonCreation,
  },
];
