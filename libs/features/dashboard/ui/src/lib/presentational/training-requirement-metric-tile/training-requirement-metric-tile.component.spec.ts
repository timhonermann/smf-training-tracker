import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRequirementMetricTile } from './training-requirement-metric-tile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TrainingRequirementMetricTile', () => {
  let component: TrainingRequirementMetricTile;
  let fixture: ComponentFixture<TrainingRequirementMetricTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRequirementMetricTile],
    })
      .overrideComponent(TrainingRequirementMetricTile, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingRequirementMetricTile);
    fixture.componentRef.setInput('totalRequirementMet', 0);
    fixture.componentRef.setInput('totalRequirementAlmostMet', 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
