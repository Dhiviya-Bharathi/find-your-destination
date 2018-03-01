import { TestBed, inject } from '@angular/core/testing';
import { defer } from 'rxjs/observable/defer'; 
import { HttpErrorResponse } from '@angular/common/http';

import { Destination } from './destination';
import { DestinationService } from './destination.service';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('DestinationService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let destinationService: DestinationService;
  const expectedDestinationList = {
    "airports": [
      {
        "airport": {
          "code": "CUR",
          "name": "Aeropuerto Hato",
          "city": {
            "code": "CUR",
            "name": "Curacao" 
          }
        }
    }]
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    destinationService = new DestinationService(<any> httpClientSpy);   
  });

  it('should be created', () => {
    expect(destinationService).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', () => {    
  
    httpClientSpy.get.and.returnValue(asyncData(expectedDestinationList));
  
    destinationService.getDestinationList().subscribe(
      destinaionList => expect(destinaionList).toEqual(expectedDestinationList.airports, 'destinaion list'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
  
    destinationService.getDestinationList().subscribe(
      destinaionList => fail('expected an error, not destinaionList'),
      error => expect(error.message).toContain('test 404 error')
    );
  });

  it('should send the destination to detect the change', () => {  
    destinationService.sendDestination(expectedDestinationList[0]);   
    destinationService.getDestination().subscribe(destination => {
        expect(destination).toEqual(expectedDestinationList[0]);        
    })     
}); 
});
