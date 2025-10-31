import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricTile } from './metric-tile';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockPipe } from 'ng-mocks';
import { DecimalPipe } from '@angular/common';

describe('MetricTile', () => {
  let component: MetricTile;
  let fixture: ComponentFixture<MetricTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricTile],
    })
      .overrideComponent(MetricTile, {
        set: {
          imports: [MockPipe(DecimalPipe)],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MetricTile);
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('value', 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
