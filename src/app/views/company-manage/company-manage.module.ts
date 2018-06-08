import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyManageRoutingModule } from './company-manage-routing.module';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

@NgModule({
  imports: [
    CommonModule,
    CompanyManageRoutingModule
  ],
  declarations: [PersonalInfoComponent]
})
export class CompanyManageModule { }
