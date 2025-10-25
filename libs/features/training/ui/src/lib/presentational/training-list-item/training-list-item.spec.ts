import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingListItem } from './training-list-item';

describe('TrainingListItem', () => {
  let component: TrainingListItem;
  let fixture: ComponentFixture<TrainingListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
