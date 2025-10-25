import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRequirementMetricTile } from './training-requirement-metric-tile.component';

describe('TrainingRequirementMetricTile', () => {
  let component: TrainingRequirementMetricTile;
  let fixture: ComponentFixture<TrainingRequirementMetricTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRequirementMetricTile],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingRequirementMetricTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
