import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonData } from '@stt/features/person/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonApiClient {
  private readonly httpClient = inject(HttpClient)

  getAllPeople(): Observable<PersonData[]> {
    return this.httpClient.get<PersonData[]>('api/v1/people')
  }

}
