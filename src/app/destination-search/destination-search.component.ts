import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DestinationService } from '../model/destination.service';
import { Destination } from '../model/destination';

@Component({
  selector: 'app-destination-search',
  templateUrl: './destination-search.component.html',
  styleUrls: ['./destination-search.component.css']
})
export class DestinationSearchComponent implements OnInit, OnDestroy {

  destinationList: Destination[];
  destinationSearchResult: Destination[];
  destinationSearchValue: string;
  selectedDestination: Destination;
  userSearchValue: string;
  subscription: Subscription;

  constructor(private destinationService: DestinationService, private router: Router) { }

  ngOnInit() {
    this.getDestinationList();
  }

  getDestinationList(): void {
    this.subscription = this.destinationService.getDestinationList()
        .subscribe(
          destinationList => this.destinationList = destinationList,
          error => console.log(error)
        );
  }

  showOptions(destinationSearchValue): void {
    this.destinationSearchResult = [
      ...this.filterList<Destination[]>(this.destinationList, destinationSearchValue, 'code'),
      ...this.filterList<Destination[]>(this.destinationList, destinationSearchValue, 'name')
    ].slice(0, 3);
  }

  selectOption(selectedDestination): void {
    const airport = selectedDestination.airport;
    this.userSearchValue = this.destinationSearchValue;
    this.selectedDestination = selectedDestination;
    this.destinationSearchValue = `${airport.name}(${airport.code}), ${airport.city.name}`;
    this.destinationSearchResult = [];
  }

  removeOption(): void {
    this.destinationSearchValue = this.userSearchValue;
    this.selectedDestination = null;
    this.showOptions(this.destinationSearchValue);
  }

  pressBackspace(): void {
    this.destinationSearchValue = this.destinationSearchValue.substring(0, this.destinationSearchValue.length - 1);
    this.showOptions(this.destinationSearchValue);
  }

  goToSummary(): void {
    this.destinationService.sendDestination(this.selectedDestination);
    this.router.navigateByUrl('/summary/' + this.selectedDestination.airport.code.toLowerCase());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private filterList<T>(list, searchValue, attr): T {
    return list.filter(item => {
      const attrValue = item.airport[attr].toLowerCase();
      const searchValueLower = searchValue.toLowerCase();
      return searchValueLower ? attrValue.startsWith(searchValueLower) : false;
    });
  }
}
