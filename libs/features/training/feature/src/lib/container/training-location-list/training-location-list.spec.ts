import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingLocationList } from './training-location-list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { expect } from 'vitest';
import { TrainingLocationStore } from '@stt/features/training/domain';
import { MockProvider } from 'ng-mocks';

describe('TrainingLocationList', () => {
  let component: TrainingLocationList;
  let fixture: ComponentFixture<TrainingLocationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLocationList],
      providers: [
        MockProvider(TrainingLocationStore, {
          entities: vi.fn(),
        }),
      ],
    })
      .overrideComponent(TrainingLocationList, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingLocationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('backLink', () => {
    expect(component.backLink()).toMatchSnapshot();
  });
});
