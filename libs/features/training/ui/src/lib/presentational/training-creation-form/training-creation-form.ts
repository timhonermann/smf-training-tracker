import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Button } from '@stt/shared/button/ui';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  TrainingCreationData,
  TrainingLocationData,
} from '@stt/features/training/model';
import { PersonData } from '@stt/shared/person/model';
import { map } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'stt-training-creation-form',
  imports: [
    Button,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './training-creation-form.html',
  styleUrl: './training-creation-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCreationForm {
  readonly #fb = inject(FormBuilder);

  readonly locations = input.required<TrainingLocationData[]>();
  readonly people = input.required<PersonData[]>();
  readonly selectedPeople = input.required<PersonData[]>();

  readonly createClicked = output<TrainingCreationData>();

  readonly form = this.#fb.group({
    scheduledAt: new FormControl<Date | null>(null, [Validators.required]),
    location: new FormControl<string | null>(null, [Validators.required]),
    people: new FormControl<string[]>([], [Validators.required]),
  });

  readonly #selectedPeopleIds$ = this.form.controls.people.valueChanges.pipe(
    map((ids) => ids ?? []),
  );

  readonly selectedPeopleIdsChanged = outputFromObservable(
    this.#selectedPeopleIds$,
  );

  create(): void {
    this.createClicked.emit(this.#mapFormToTrainingCreationData());
  }

  #mapFormToTrainingCreationData(): TrainingCreationData {
    return {
      scheduledAt: this.form.controls.scheduledAt.value ?? new Date(),
      locationId: this.form.controls.location.value ?? '',
      personIds: this.form.controls.people.value ?? [],
    };
  }
}
