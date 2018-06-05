import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { InternalRoutingModule } from "./internal-routing.module";
import { LayoutModule } from "../../layout/layout.module";

import { DeptManageComponent } from './dept-manage/dept-manage.component';
import { RoleManageComponent } from "./role-manage/role-manage.component";
import { UserManageComponent } from "./user-manage/user-manage.component";


@NgModule({
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    InternalRoutingModule,
    LayoutModule,
  ],
  declarations:[
    DeptManageComponent,
    RoleManageComponent,
    UserManageComponent
  ]
})
export class InternalModule{}
