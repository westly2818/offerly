import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfferingComponent } from './offering/offering.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
  ,
  {
    path: 'offering',
    component: OfferingComponent
  }
  // Future routes will be added here when modules are created:
  // {
  //   path: 'offerings',
  //   loadChildren: () => import('./offerings/offerings.module').then(m => m.OfferingsModule)
  // },
  // {
  //   path: 'funds',
  //   loadChildren: () => import('./funds/funds.module').then(m => m.FundsModule)
  // },
  // {
  //   path: 'donations',
  //   loadChildren: () => import('./donations/donations.module').then(m => m.DonationsModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChurchAdminRoutingModule { }
