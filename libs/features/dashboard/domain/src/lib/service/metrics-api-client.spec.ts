import { TestBed } from '@angular/core/testing';

import { MetricsApiClient } from './metrics-api-client';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';

describe('MetricsApiClient', () => {
  let service: MetricsApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(HttpClient)],
    });
    service = TestBed.inject(MetricsApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
