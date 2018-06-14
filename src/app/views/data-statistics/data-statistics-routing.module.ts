import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatingDataComponent } from './operating-data/operating-data.component';
import { MerchantDataComponent } from './merchant-data/merchant-data.component';
import { MerchantSaleDataComponent} from './merchant-sale-data/merchant-sale-data.component';
import { PurchaseDataComponent } from './purchase-data/purchase-data.component';
import { PesticideDataComponent } from './pesticide-data/pesticide-data.component';
import { SaleDetailsComponent } from './sale-details/sale-details.component';
import { RestrictPesticideComponent } from './restrict-pesticide/restrict-pesticide.component';

const routes: Routes = [
  { path: 'operatingData', component: OperatingDataComponent},
  { path: 'merchantData', component: MerchantDataComponent},
  { path: 'saleData/:orgId', component: MerchantSaleDataComponent},
  { path: 'saleDetails/:productCode', component: SaleDetailsComponent},
  { path: 'purchaseData/:orgId', component: PurchaseDataComponent},
  { path: 'pesticideQuery', component: PesticideDataComponent},
  { path: 'restrictPesticideQuery', component: RestrictPesticideComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataStatisticsRoutingModule { }
