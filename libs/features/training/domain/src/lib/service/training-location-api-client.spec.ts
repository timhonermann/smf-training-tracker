import { TestBed } from '@angular/core/testing';

import { TrainingLocationApiClient } from './training-location-api-client';

describe('TrainingLocationApiClient', () => {
  let service: TrainingLocationApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingLocationApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
