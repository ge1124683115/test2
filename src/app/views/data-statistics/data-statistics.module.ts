import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataStatisticsRoutingModule } from './data-statistics-routing.module';
import { OperatingDataComponent } from './operating-data/operating-data.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DataStatisticsRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  declarations: [OperatingDataComponent]
})
export class DataStatisticsModule { }
