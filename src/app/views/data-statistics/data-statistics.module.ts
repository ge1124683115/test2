import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataStatisticsRoutingModule } from './data-statistics-routing.module';
import { OperatingDataComponent } from './operating-data/operating-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MerchantDataComponent } from './merchant-data/merchant-data.component';
import { OperatingDataServiceNs } from './operating-data/operating-data.service';
import { MerchantDataServiceNs } from  './merchant-data/merchant-data.service';
import { PesticideDataComponent } from './pesticide-data/pesticide-data.component';
import { MerchantSaleDataComponent } from './merchant-sale-data/merchant-sale-data.component';
import { MerchantSaleDataServiceNs } from './merchant-sale-data/merchant-sale-data.service';
import { SaleDetailsComponent } from './sale-details/sale-details.component';
import { PurchaseDataComponent } from './purchase-data/purchase-data.component';
import { PurchaseDataServiceNs } from './purchase-data/purchase-data.service';
@NgModule({
  imports: [
    CommonModule,
    DataStatisticsRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  declarations: [OperatingDataComponent, MerchantDataComponent, PesticideDataComponent, MerchantSaleDataComponent,
    SaleDetailsComponent, PurchaseDataComponent],
  providers: [
    OperatingDataServiceNs.OperatingDataService,
    MerchantDataServiceNs.MerchantDataService,
    MerchantSaleDataServiceNs.MerchantSaleDataService,
    PurchaseDataServiceNs.PurchaseDataService
  ]
})
export class DataStatisticsModule { }
