import { TestBed } from '@angular/core/testing';

import { TrainingApiClient } from './training-api-client';

describe('TrainingApiClient', () => {
  let service: TrainingApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
