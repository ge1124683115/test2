/**
 * 此模块内不包含服务，不需要注册到根模块。
 * **/
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { NavBreadcrumbComponent } from './nav-breadcrumb/nav-breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  declarations:[
    SideMenuComponent,
    NavBreadcrumbComponent,
  ],
  exports:[
    SideMenuComponent,
    NavBreadcrumbComponent,
  ]
})
export class LayoutModule{}
