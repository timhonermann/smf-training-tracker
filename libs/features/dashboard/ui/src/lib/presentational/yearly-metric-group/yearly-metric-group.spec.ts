import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearlyMetricGroup } from './yearly-metric-group';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('YearlyMetricGroup', () => {
  let component: YearlyMetricGroup;
  let fixture: ComponentFixture<YearlyMetricGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyMetricGroup],
    })
      .overrideComponent(YearlyMetricGroup, {
        set: { imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(YearlyMetricGroup);
    fixture.componentRef.setInput('year', 0);
    fixture.componentRef.setInput('totalRequirementMet', 0);
    fixture.componentRef.setInput('totalRequirementAlmostMet', 0);
    fixture.componentRef.setInput('averageParticipants', 0);
    fixture.componentRef.setInput('totalTrainings', 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
