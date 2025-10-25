import { TestBed } from '@angular/core/testing';

import { MetricsApiClient } from './metrics-api-client';

describe('MetricsApiClient', () => {
  let service: MetricsApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricsApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
