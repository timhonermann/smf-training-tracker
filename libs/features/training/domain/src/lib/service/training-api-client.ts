import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TrainingCreationData,
  TrainingData,
} from '@stt/features/training/model';

const API_URI = 'api/v1/trainings';

@Injectable({
  providedIn: 'root',
})
export class TrainingApiClient {
  readonly #httpClient = inject(HttpClient);

  getAll(): Observable<TrainingData[]> {
    return this.#httpClient.get<TrainingData[]>(API_URI);
  }

  create(trainingCreationData: TrainingCreationData): Observable<TrainingData> {
    return this.#httpClient.post<TrainingData>(API_URI, trainingCreationData);
  }
}
