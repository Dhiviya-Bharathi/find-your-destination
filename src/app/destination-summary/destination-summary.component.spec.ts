import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute } from '@angular/router';

import { DestinationSummaryComponent } from './destination-summary.component';
import { DestinationService } from '../model/destination.service';
import { Destination } from '../model/destination';
import { ActivatedRouteStub } from '../../testing';

describe('DestinationSummaryComponent', () => {
  const mockDestination: Destination = {
    airport: {
      code: 'TES',
      name: 'Test',
      city: {
        code: 'TES',
        name: 'Test'
      }
    }
  };
  let component: DestinationSummaryComponent;
  let fixture: ComponentFixture<DestinationSummaryComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({ code: mockDestination.airport.code.toLowerCase() });
    const destinationServiceSpy = jasmine.createSpyObj('DestinationService', ['getDestination']);
    TestBed.configureTestingModule({
      declarations: [ DestinationSummaryComponent ],
      providers: [
        { provide: DestinationService, useValue: destinationServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents()
    .then(() => {

      fixture = TestBed.createComponent(DestinationSummaryComponent);
      component = fixture.componentInstance;

      destinationServiceSpy.getDestination.and.returnValue(of(mockDestination));
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  /* COMPONENT BEFORE INIT  */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* COMPONENT INIT */

  it('should have value for destinationCode on ngOnInit', () => {
    expect(component.destinationCode).toBe('tes');
  });

  it('should have value for destination on ngOnInit', () => {
    expect(component.destination.airport).toBeDefined();
  });

  it('should have created subscription on ngOnInit', () => {
    expect(component.subscription).toBeDefined();
  });

  /* COMPONENT RENDER */

  it('should display airport name on ngOnInit', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.airport-name').textContent).toContain('Test');
  });

  /* COMPONENT DESTROY */

  it('should have destroyed subscription on ngOnDestroy', () => {
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(component.subscription.closed).toBeTruthy();
  });

});
