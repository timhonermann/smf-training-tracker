import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingLocationList } from './training-location-list';

describe('TrainingLocationList', () => {
  let component: TrainingLocationList;
  let fixture: ComponentFixture<TrainingLocationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLocationList],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingLocationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
