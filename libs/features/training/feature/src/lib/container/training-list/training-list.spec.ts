import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingList } from './training-list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TrainingStore } from '@stt/features/training/domain';
import { MockProvider } from 'ng-mocks';

describe('TrainingList', () => {
  let component: TrainingList;
  let fixture: ComponentFixture<TrainingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingList],
      providers: [
        MockProvider(TrainingStore, {
          entities: vi.fn(),
        }),
      ],
    })
      .overrideComponent(TrainingList, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrainingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
