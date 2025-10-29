import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRequirement } from './training-requirement';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockProvider } from 'ng-mocks';
import { TrainingRequirementsStore } from '@stt/features/dashboard/domain';
import { vitest } from 'vitest';

describe('TrainingRequirement', () => {
  let component: TrainingRequirement;
  let fixture: ComponentFixture<TrainingRequirement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRequirement],
    })
      .overrideComponent(TrainingRequirement, {
        set: {
          imports: [],
          providers: [
            MockProvider(TrainingRequirementsStore, {
              entities: vitest.fn(),
            }),
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingRequirement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
