import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { LayoutModule } from "../../layout/layout.module";
import { DirectivesModule } from "../../directives/directives.module";
import { CompanyRoutingModule } from "./company-routing.module";

import { LevelManageComponent } from "./level-manage/level-manage.component";
import { InfoManageComponent } from './info-manage/info-manage.component';

@NgModule({
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    CompanyRoutingModule,
    LayoutModule,
    DirectivesModule
  ],
  declarations:[
    LevelManageComponent,
    InfoManageComponent,
  ]
})
export class CompanyModule{}
