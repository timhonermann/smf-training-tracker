import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRequirementList } from './training-requirement-list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TrainingRequirementList', () => {
  let component: TrainingRequirementList;
  let fixture: ComponentFixture<TrainingRequirementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRequirementList],
    })
      .overrideComponent(TrainingRequirementList, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingRequirementList);
    fixture.componentRef.setInput('people', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
