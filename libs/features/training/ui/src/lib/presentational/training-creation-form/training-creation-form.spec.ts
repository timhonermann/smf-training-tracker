import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingCreationForm } from './training-creation-form';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent, MockDirective } from 'ng-mocks';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';

describe('TrainingCreationForm', () => {
  let component: TrainingCreationForm;
  let fixture: ComponentFixture<TrainingCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingCreationForm],
    })
      .overrideComponent(TrainingCreationForm, {
        set: {
          imports: [
            ReactiveFormsModule,
            MockComponent(MatSelect),
            MockDirective(MatDatepickerInput),
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingCreationForm);
    fixture.componentRef.setInput('locations', []);
    fixture.componentRef.setInput('people', []);
    fixture.componentRef.setInput('selectedPeople', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
