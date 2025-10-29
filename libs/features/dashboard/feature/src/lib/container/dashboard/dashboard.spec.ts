import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockProvider } from 'ng-mocks';
import { SummaryMetricStore } from '@stt/features/dashboard/domain';
import { vitest } from 'vitest';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    })
      .overrideComponent(Dashboard, {
        set: {
          imports: [],
          providers: [
            MockProvider(SummaryMetricStore, {
              currentYear: {
                year: vitest.fn(),
                totalPeopleTrainingRequirementMet: vitest.fn(),
                totalPeopleTrainingRequirementAlmostAlmostMet: vitest.fn(),
                totalTrainings: vitest.fn(),
                averageParticipants: vitest.fn(),
              },
              previousYear: {
                year: vitest.fn(),
                totalPeopleTrainingRequirementMet: vitest.fn(),
                totalPeopleTrainingRequirementAlmostAlmostMet: vitest.fn(),
                totalTrainings: vitest.fn(),
                averageParticipants: vitest.fn(),
              },
            }),
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
