import { Routes } from '@angular/router';
import { PersonList } from './container/person-list/person-list';
import { PersonCreation } from './container/person-creation/person-creation';
import { PersonStore } from '@stt/features/person/domain';

export const routes: Routes = [
  {
    path: '',
    providers: [PersonStore],
    children: [
      {
        path: '',
        component: PersonList,
      },
      {
        path: 'create',
        component: PersonCreation,
      },
    ],
  },
];
