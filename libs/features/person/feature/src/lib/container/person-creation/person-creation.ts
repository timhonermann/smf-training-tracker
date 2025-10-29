import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonStore } from '@stt/features/person/domain';
import { ReactiveFormsModule } from '@angular/forms';
import { featureRoutes } from '@stt/shared/routing/model';
import { BackButton } from '@stt/shared/button/ui';
import { PersonCreationForm } from '@stt/features/person/ui';

@Component({
  selector: 'stt-person-creation',
  imports: [ReactiveFormsModule, BackButton, PersonCreationForm],
  templateUrl: './person-creation.html',
  styleUrl: './person-creation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCreation {
  readonly store = inject(PersonStore);

  protected readonly featureRoutes = featureRoutes;
}
