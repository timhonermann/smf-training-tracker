import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersonCreationData, PersonData } from '@stt/shared/person/model';

const API_URI = 'api/v1/people';

@Injectable({
  providedIn: 'root',
})
export class PersonApiClient {
  private readonly httpClient = inject(HttpClient);

  getAll(): Observable<PersonData[]> {
    return this.httpClient.get<PersonData[]>(API_URI);
  }

  create(personCreationData: PersonCreationData): Observable<PersonData> {
    return this.httpClient.post<PersonData>(API_URI, personCreationData);
  }
}
