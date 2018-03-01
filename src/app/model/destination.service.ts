import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

import { Destination } from './destination';

@Injectable()
export class DestinationService {

  private subject = new BehaviorSubject<any>({text: 'message'});
  destinationList: Destination[];
  
  constructor(private http: HttpClient) {}

  getDestinationList(): Observable<Destination[]> { 
    return this.http.get<{[k:string]:Destination[]}>('/api/airports')
      .map(result => result.airports)
      .catch(this.handleError<any>('getDestinationList'));             
  }
 
  sendDestination(destination: Destination) {
    this.subject.next(destination);
  }

  getDestination(): Observable<Destination> {
    return this.subject.asObservable();
  }

  private handleError<T> (operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      console.error(error); 

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };
  }

}
