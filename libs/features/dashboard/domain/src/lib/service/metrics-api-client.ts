import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PersonTrainingRequirementMetric,
  SummaryMetric,
  YearReference,
} from '@stt/features/dashboard/model';

const API_URI = 'api/v1/metrics';

@Injectable({
  providedIn: 'root',
})
export class MetricsApiClient {
  readonly #httpClient = inject(HttpClient);

  getSummary(): Observable<SummaryMetric> {
    const uri = `${API_URI}/summary`;

    return this.#httpClient.get<SummaryMetric>(uri);
  }

  getTrainingRequirements(
    yearReference: YearReference,
  ): Observable<PersonTrainingRequirementMetric[]> {
    const uri = `${API_URI}/training-requirements`;

    return this.#httpClient.get<PersonTrainingRequirementMetric[]>(uri, {
      params: { yearReference },
    });
  }
}
