import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TrainingLocationCreationData,
  TrainingLocationData,
} from '@stt/features/training/model';

const API_URI = 'api/v1/training-locations';

@Injectable({
  providedIn: 'root',
})
export class TrainingLocationApiClient {
  readonly #httpClient = inject(HttpClient);

  getAll(): Observable<TrainingLocationData[]> {
    return this.#httpClient.get<TrainingLocationData[]>(API_URI);
  }

  create(
    trainingLocationCreationData: TrainingLocationCreationData
  ): Observable<TrainingLocationData> {
    return this.#httpClient.post<TrainingLocationData>(
      API_URI,
      trainingLocationCreationData
    );
  }
}
