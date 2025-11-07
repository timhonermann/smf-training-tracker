import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRequirementTitle } from './training-requirement-title';

describe('TrainingRequirementTitle', () => {
  let component: TrainingRequirementTitle;
  let fixture: ComponentFixture<TrainingRequirementTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRequirementTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingRequirementTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
