import { TestBed, waitForAsync } from '@angular/core/testing';

import { TrainingApiClient } from './training-api-client';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';
import { describe, expect } from 'vitest';
import {
  TrainingCreationData,
  TrainingData,
} from '@stt/features/training/model';
import { of } from 'rxjs';

describe('TrainingApiClient', () => {
  let service: TrainingApiClient;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(HttpClient)],
    });

    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(TrainingApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should call http client get method', waitForAsync(() => {
      // arrange
      const trainingData: TrainingData[] = [
        {
          id: '1',
          scheduledAt: new Date(Date.UTC(2025, 10, 31)),
          location: {
            id: '5',
            name: 'Shire',
          },
          people: [],
        },
      ];
      const getSpy = vi
        .spyOn(httpClient, 'get')
        .mockReturnValueOnce(of(trainingData));

      // act
      const result$ = service.getAll();

      // assert
      result$.subscribe((result) => {
        expect(result).toEqual(trainingData);
        expect(getSpy).toHaveBeenCalledOnce();
      });
    }));
  });

  describe('create', () => {
    it('should call http client post method', waitForAsync(() => {
      // arrange
      const trainingCreationData: TrainingCreationData = {
        scheduledAt: new Date(Date.UTC(2025, 10, 31)),
        locationId: '5',
        personIds: [],
      };
      const postSpy = vi
        .spyOn(httpClient, 'post')
        .mockReturnValueOnce(of(trainingCreationData));

      // act
      const result$ = service.create(trainingCreationData);

      // assert
      result$.subscribe(() => {
        expect(postSpy).toHaveBeenCalledExactlyOnceWith(
          expect.anything(),
          trainingCreationData,
        );
      });
    }));
  });
});
