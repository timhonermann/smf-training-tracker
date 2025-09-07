import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingCreation } from './training-creation';

describe('TrainingCreation', () => {
  let component: TrainingCreation;
  let fixture: ComponentFixture<TrainingCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
