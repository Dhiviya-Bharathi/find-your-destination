import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { DestinationService } from '../model/destination.service';
import { Destination } from '../model/destination';

@Component({
  selector: 'app-destination-summary',
  templateUrl: './destination-summary.component.html',
  styleUrls: ['./destination-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DestinationSummaryComponent implements OnInit, OnDestroy  {

  destinationCode: string;
  destination: Destination;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private destinationService: DestinationService) {}

  ngOnInit() {
    this.route.paramMap
      .map(params =>  params.get('code'))
      .subscribe(code => {
        this.destinationCode = code;
      });

    this.subscription = this.destinationService.getDestination()
      .subscribe(destination => this.destination = destination);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
