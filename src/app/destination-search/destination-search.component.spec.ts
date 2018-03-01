import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';

import { DestinationSearchComponent } from './destination-search.component';
import { DestinationService } from '../model/destination.service';
import { Destination } from '../model/destination';

describe('DestinationSearchComponent', () => {
  let component: DestinationSearchComponent;
  let fixture: ComponentFixture<DestinationSearchComponent>;
  let destinationServiceStub: Partial<DestinationService>;
  let mockDestinationList: Destination[] = [{
    airport: {
      code: 'TES',
      name: 'Test',
      city: {
        code: 'TES',
        name: 'Test'
      }
    }
  }];
  let destinationService, router;
  
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const destinationServiceSpy = jasmine.createSpyObj('DestinationService', ['getDestinationList', 'sendDestination']);
    TestBed.configureTestingModule({
      declarations: [ DestinationSearchComponent ],
      imports: [ FormsModule ],
      providers: [ 
        { provide: DestinationService, useValue: destinationServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(DestinationSearchComponent);
      component = fixture.componentInstance;

      destinationServiceSpy.getDestinationList.and.returnValue(of(mockDestinationList));
      destinationServiceSpy.sendDestination.and.returnValue(null);
      routerSpy.navigateByUrl.and.returnValue(null);
    });
  }));

  beforeEach(()=> {
    fixture.detectChanges();
  });

  /* COMPONENT BEFORE INIT  */

  it('should create', async(() => {        
    expect(component).toBeTruthy();
  }));

  /* COMPONENT INIT */

  it('should have value for destinationList on ngOnInit', () => {    
    expect(component.destinationList).toBeDefined();
  });

  /* TRIGGERING EVENTS */
  describe('to test events', () => {
    let compiled;
    beforeEach(() => {
      compiled = fixture.debugElement.nativeElement;
    });

    it('should filter list based on user input', () => {      
      const searchInput = compiled.querySelector('input');    
      searchInput.value = 'te';
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    
      expect(component.destinationSearchResult.length).not.toBe(0);
      expect(component.destinationSearchResult.length).toBeLessThanOrEqual(3);
    });

    it('should select option from list based on user click', () => {
      let listElement;
      let mockAirport = mockDestinationList[0].airport;
      let expectedSearchValue = `${mockAirport.name}(${mockAirport.code}), ${mockAirport.city.name}`;
      component.destinationSearchResult = mockDestinationList;
      fixture.detectChanges();      
      listElement = compiled.querySelector('li');      
      listElement.click();   

      expect(component.selectedDestination).toBeDefined();
      expect(component.destinationSearchValue).toBe(expectedSearchValue);
      expect(component.destinationSearchResult.length).toEqual(0);
    });

    it('should remove selection based on remove button click', () => {
      let buttonElement;      
      component.selectedDestination = mockDestinationList[0];
      component.destinationSearchValue = 'te';
      fixture.detectChanges(); 
           
      buttonElement = compiled.querySelectorAll('button')[0];            
      buttonElement.click();    

      expect(component.selectedDestination).toBeNull();
    });

    it('should backspace the input on remove button click', () => {
      let buttonElement;  
      let testValue = 'test';
      component.destinationSearchValue = testValue;
      fixture.detectChanges(); 
           
      buttonElement = compiled.querySelectorAll('button')[0];            
      buttonElement.click();   

      expect(component.destinationSearchValue).not.toBe(testValue);
    });

    it('should navigate to summary page on continue button click', () => {
      let buttonElement; 
      router = fixture.debugElement.injector.get(Router);
      component.selectedDestination = mockDestinationList[0];
      fixture.detectChanges(); 
           
      buttonElement = compiled.querySelectorAll('button')[0];
      buttonElement.click(); 
      
      const spy = router.navigateByUrl as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];
      const code = component.destinationList[0].airport.code.toLowerCase();
      
      expect(navArgs).toBe('/summary/' + code, 'should nav to Summary for test');
    });
  });
});
