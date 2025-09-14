import { TestBed } from '@angular/core/testing';

import { PersonApiClient } from './person-api-client';

describe('PersonApiClient', () => {
  let service: PersonApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
