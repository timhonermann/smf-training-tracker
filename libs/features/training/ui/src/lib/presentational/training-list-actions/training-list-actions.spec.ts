import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingListActions } from './training-list-actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TrainingListActions', () => {
  let component: TrainingListActions;
  let fixture: ComponentFixture<TrainingListActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingListActions],
    })
      .overrideComponent(TrainingListActions, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingListActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
