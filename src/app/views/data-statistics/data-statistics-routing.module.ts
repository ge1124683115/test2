import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatingDataComponent } from './operating-data/operating-data.component';
import { MerchantDataComponent } from './merchant-data/merchant-data.component';
import { MerchantSaleDataComponent} from './merchant-sale-data/merchant-sale-data.component';
import { PesticideDataComponent } from './pesticide-data/pesticide-data.component';
const routes: Routes = [
  { path: 'operatingData', component: OperatingDataComponent},
  { path: 'merchantData', component: MerchantDataComponent},
  { path: 'saleData/:orgId', component: MerchantSaleDataComponent},
  { path: 'pesticideQuery', component: PesticideDataComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataStatisticsRoutingModule { }
