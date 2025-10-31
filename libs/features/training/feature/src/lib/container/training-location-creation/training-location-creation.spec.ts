import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingLocationCreation } from './training-location-creation';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TrainingLocationStore } from '@stt/features/training/domain';
import { describe, expect } from 'vitest';
import { MockProvider } from 'ng-mocks';
import { ReactiveFormsModule } from '@angular/forms';

describe('TrainingLocationCreation', () => {
  let component: TrainingLocationCreation;
  let fixture: ComponentFixture<TrainingLocationCreation>;
  let store: TrainingLocationStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLocationCreation],
      providers: [
        MockProvider(TrainingLocationStore, {
          create: vi.fn(),
        }),
      ],
    })
      .overrideComponent(TrainingLocationCreation, {
        set: {
          imports: [ReactiveFormsModule],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    store = TestBed.inject(TrainingLocationStore);

    fixture = TestBed.createComponent(TrainingLocationCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('backLink', () => {
    expect(component.backLink()).toMatchSnapshot();
  });

  describe('create', () => {
    it('should call store create with nameControl value', () => {
      // arrange
      const value = 'Pilatus';
      const createSpy = vi.spyOn(store, 'create');

      component.nameControl.setValue(value);

      // act
      component.create();

      // assert
      expect(createSpy).toHaveBeenCalledExactlyOnceWith({ name: value });
    });
  });
});
