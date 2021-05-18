import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  companyList(): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/user/jobs/`)
      .pipe(
        catchError((error) => {
          return error
        }),
      )
  }

  applicantList(_id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/user/jobs/${_id}`)
      .pipe(
        catchError((error) => {
          return error
        }),
      )
  }
}
