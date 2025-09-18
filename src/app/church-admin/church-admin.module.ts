import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ChurchAdminRoutingModule } from './church-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfferingComponent } from './offering/offering.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OfferingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChurchAdminRoutingModule
  ]
})
export class ChurchAdminModule { }
