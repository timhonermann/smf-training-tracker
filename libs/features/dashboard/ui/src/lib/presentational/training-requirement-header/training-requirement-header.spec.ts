import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRequirementHeader } from './training-requirement-header';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('TrainingRequirementHeader', () => {
  let component: TrainingRequirementHeader;
  let fixture: ComponentFixture<TrainingRequirementHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRequirementHeader],
    })
      .overrideComponent(TrainingRequirementHeader, {
        set: {
          imports: [ReactiveFormsModule],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingRequirementHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
