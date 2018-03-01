import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DestinationSearchComponent } from './destination-search/destination-search.component';
import { DestinationSummaryComponent } from './destination-summary/destination-summary.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: DestinationSearchComponent },
    { path: 'summary/:code', component: DestinationSummaryComponent },      
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes
      )
    ],
    exports: [
      RouterModule
    ]
})
export class AppRoutingModule {}