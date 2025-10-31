import { TestBed } from '@angular/core/testing';

import { PersonApiClient } from './person-api-client';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';

describe('PersonApiClient', () => {
  let service: PersonApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(HttpClient)],
    });
    service = TestBed.inject(PersonApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
