import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkboardContentComponent } from './workboard-content/workboard-content.component';
import { WorkboardRoutingModule } from './workboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WorkboardRoutingModule
  ],
  declarations: [
    WorkboardContentComponent
  ]
})
export class WorkboardModule { }
