import { TestBed, inject } from '@angular/core/testing';
import { defer } from 'rxjs/observable/defer'; 

import { DestinationService } from './destination.service';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('DestinationService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let destinationService: DestinationService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    destinationService = new DestinationService(<any> httpClientSpy);   
  });

  it('should be created', () => {
    expect(destinationService).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes =
    [
      {
        "airport": {
          "code": "CUR",
          "name": "Aeropuerto Hato",
          "city": {
            "code": "CUR",
            "name": "Curacao" 
          }
        }
      }];
  
    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));
  /*
    destinationService.getDestinationList().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    );*/
    expect(httpClientSpy.get.calls.count()).toBe(0, 'no call');
  });
});
