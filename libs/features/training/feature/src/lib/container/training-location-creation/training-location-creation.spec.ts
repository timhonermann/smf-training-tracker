import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingLocationCreation } from './training-location-creation';

describe('TrainingLocationCreation', () => {
  let component: TrainingLocationCreation;
  let fixture: ComponentFixture<TrainingLocationCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLocationCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingLocationCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
