import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingListItem } from './training-list-item';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockPipe } from 'ng-mocks';
import { DatePipe } from '@angular/common';

describe('TrainingListItem', () => {
  let component: TrainingListItem;
  let fixture: ComponentFixture<TrainingListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingListItem],
    })
      .overrideComponent(TrainingListItem, {
        set: {
          imports: [MockPipe(DatePipe)],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingListItem);
    fixture.componentRef.setInput('item', {
      location: { name: '' },
      people: [],
      scheduledAt: '',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
