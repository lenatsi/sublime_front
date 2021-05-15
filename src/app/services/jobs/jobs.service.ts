import {Job} from './../../models/job.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private httpClient: HttpClient) { }

  getJob(_id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/job/${_id}`).pipe(
      catchError((error) => {
        return error
      }),
    )
  }

  getallJobs(filter:string, localization:string, type:string): Observable<any> {
    const params = { filter:filter, localization:localization, type:type}
    return this.httpClient
      .get(`${environment.apiUrl}/jobs`, { params:params })
      .pipe(
        catchError((error) => {
          return error
        }),
      )
  }

  saveJob(trabajo: Job ): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/job`, trabajo).pipe(
      catchError((error) => {
        return error
      }),
    )
  }

  updateJob(trabajo: Job): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/job/${trabajo._id}`, trabajo)
      .pipe(
        catchError((error) => {
          return error
        }),
      )
  }
}




