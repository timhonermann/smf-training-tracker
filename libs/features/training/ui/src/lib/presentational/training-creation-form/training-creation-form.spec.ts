import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingCreationForm } from './training-creation-form';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent, MockDirective } from 'ng-mocks';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { describe, expect } from 'vitest';

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

  describe('create', () => {
    it('should emit createClicked output with TrainingCreationData from form', () => {
      // arrange
      const scheduledAt = new Date(Date.UTC(2025, 10, 31));
      const locationId = 'xy123';
      const personIds = ['p1', 'p2'];
      const emitSpy = vi.spyOn(component.createClicked, 'emit');

      component.form.setValue({
        scheduledAt,
        location: locationId,
        people: personIds,
      });

      // act
      component.create();

      // assert
      expect(emitSpy).toHaveBeenCalledExactlyOnceWith({
        scheduledAt,
        locationId,
        personIds,
      });
    });
  });
});
