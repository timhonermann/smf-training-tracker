import { signalStore, withMethods } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { PersonData } from '@stt/features/person/model';

export const PersonStore = signalStore(
  withEntities<PersonData>(),
  withMethods((store) => ({

  }))
)
