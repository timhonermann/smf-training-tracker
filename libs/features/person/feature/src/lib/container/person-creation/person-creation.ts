import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonStore } from '@stt/features/person/domain';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonData, role, Role } from '@stt/features/person/model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton, MatFabButton } from '@angular/material/button';
import { featureRoutes } from '@stt/shared/routing/model';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stt-person-creation',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatFabButton,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './person-creation.html',
  styleUrl: './person-creation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCreation {
  private readonly store = inject(PersonStore);
  private readonly formBuilder = inject(FormBuilder);

  readonly role = role;
  readonly featureRoutes = featureRoutes;

  readonly personForm = this.formBuilder.group({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    role: new FormControl<Role>(role.MEMBER, [Validators.required]),
  });

  create(): void {
    const personData: PersonData = {
      id: '',
      firstName: this.personForm.controls.firstName.value ?? '',
      lastName: this.personForm.controls.lastName.value ?? '',
      role: this.personForm.controls.role.value ?? role.MEMBER,
    };

    this.store.create(personData);
  }
}
