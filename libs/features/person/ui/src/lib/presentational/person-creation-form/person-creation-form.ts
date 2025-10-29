import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { Button } from '@stt/shared/button/ui';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonCreationData, role, Role } from '@stt/shared/person/model';

@Component({
  selector: 'stt-person-creation-form',
  imports: [
    Button,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './person-creation-form.html',
  styleUrl: './person-creation-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCreationForm {
  readonly #formBuilder = inject(FormBuilder);

  readonly createClicked = output<PersonCreationData>();

  readonly role = role;

  readonly personForm = this.#formBuilder.group({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    role: new FormControl<Role>(role.MEMBER, [Validators.required]),
  });

  create(): void {
    this.createClicked.emit(this.#mapFormToPersonCreationData());
  }

  #mapFormToPersonCreationData(): PersonCreationData {
    return {
      firstName: this.personForm.controls.firstName.value ?? '',
      lastName: this.personForm.controls.lastName.value ?? '',
      role: this.personForm.controls.role.value ?? role.MEMBER,
    };
  }
}
