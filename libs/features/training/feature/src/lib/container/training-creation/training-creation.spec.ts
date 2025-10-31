import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingCreation } from './training-creation';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { expect } from 'vitest';
import { MockProvider } from 'ng-mocks';
import {
  TrainingLocationStore,
  TrainingStore,
} from '@stt/features/training/domain';

describe('TrainingCreation', () => {
  let component: TrainingCreation;
  let fixture: ComponentFixture<TrainingCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingCreation],
      providers: [
        MockProvider(TrainingStore, {
          people: vi.fn(),
          selectedPeople: vi.fn(),
          create: vi.fn(),
          setSelectedPersonIds: vi.fn(),
        }),
        MockProvider(TrainingLocationStore, {
          entities: vi.fn(),
        }),
      ],
    })
      .overrideComponent(TrainingCreation, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('backLink', () => {
    expect(component.backLink()).toMatchSnapshot();
  });
});
