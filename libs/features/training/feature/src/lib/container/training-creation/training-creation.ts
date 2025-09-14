import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { featureRoutes } from '@stt/shared/routing/model';
import { BackButton, Button } from '@stt/shared/button/ui';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  TrainingLocationStore,
  TrainingStore,
} from '@stt/features/training/domain';
import { TrainingCreationData } from '@stt/features/training/model';
import { MatOption, MatSelect } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'stt-training-creation',
  imports: [
    BackButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatSelect,
    MatOption,
    Button,
  ],
  templateUrl: './training-creation.html',
  styleUrl: './training-creation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCreation {
  readonly #trainingStore = inject(TrainingStore);
  readonly #locationStore = inject(TrainingLocationStore);
  readonly #fb = inject(FormBuilder);
  readonly #destroyRef = inject(DestroyRef);

  readonly locations = this.#locationStore.entities;
  readonly people = this.#trainingStore.people;
  readonly selectedPeople = this.#trainingStore.selectedPeople;

  readonly form = this.#fb.group({
    scheduledAt: new FormControl<Date | null>(null, [Validators.required]),
    location: new FormControl<string | null>(null, [Validators.required]),
    people: new FormControl<string[]>([], [Validators.required]),
  });

  readonly backLink = signal(`/${featureRoutes.TRAINING}`).asReadonly();

  constructor() {
    this.setSelectedPeopleIds();
  }

  setSelectedPeopleIds(): void {
    this.form.controls.people.valueChanges
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        map((ids) => (!ids ? [] : ids))
      )
      .subscribe((ids) => this.#trainingStore.setSelectedPersonIds(ids));
  }

  create(): void {
    const creationData: TrainingCreationData = {
      scheduledAt: this.form.controls.scheduledAt.value ?? new Date(),
      locationId: this.form.controls.location.value ?? '',
      personIds: this.form.controls.people.value ?? [],
    };

    this.#trainingStore.create(creationData);
  }
}
