import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonData } from '@stt/features/person/model';
import { HttpClient } from '@angular/common/http';

const API_URI = 'api/v1/people'

@Injectable({
  providedIn: 'root'
})
export class PersonApiClient {
  private readonly httpClient = inject(HttpClient)

  getAll(): Observable<PersonData[]> {
    return this.httpClient.get<PersonData[]>(API_URI)
  }

  create(person: PersonData): Observable<PersonData> {
    return this.httpClient.post<PersonData>(API_URI, person)
  }

}
