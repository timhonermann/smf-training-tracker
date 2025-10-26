import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRequirement } from './training-requirement';

describe('TrainingRequirement', () => {
  let component: TrainingRequirement;
  let fixture: ComponentFixture<TrainingRequirement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRequirement],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingRequirement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
