import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatingDataComponent } from './operating-data/operating-data.component';
const routes: Routes = [
  { path: 'operatingData', component: OperatingDataComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataStatisticsRoutingModule { }
