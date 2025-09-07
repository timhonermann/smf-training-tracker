import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonStore } from '@stt/features/person/domain';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonData, Role, role } from '@stt/features/person/model';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'stt-person',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
  ],
  templateUrl: './person.html',
  styleUrl: './person.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PersonStore],
})
export class Person {
  private readonly store = inject(PersonStore);
  private readonly formBuilder = inject(FormBuilder);

  readonly role = role;

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
      role: this.personForm.controls.role.value ?? role.MEMBER
    };

    this.store.create(personData);
  }
}
