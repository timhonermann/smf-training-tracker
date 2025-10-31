import { TestBed } from '@angular/core/testing';

import { TrainingLocationApiClient } from './training-location-api-client';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';

describe('TrainingLocationApiClient', () => {
  let service: TrainingLocationApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(HttpClient)],
    });
    service = TestBed.inject(TrainingLocationApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
