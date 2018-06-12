

import { NgModule } from "@angular/core";
import { HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { HttpUtilNs } from "./infra/http/http-util.service";

import { DefaultInterceptor } from "./infra/interceptors/default.interceptor";
import { UfastCodeInterceptor } from "./infra/interceptors/default.interceptor";

import { UserServiceNs } from "./common-services/user.service";
import { MenuServiceNs } from "./common-services/menu.service";
import { ScepterServiceNs } from "./common-services/scepter.service";
import { UfastValidatorsService } from "./infra/validators/validators.service";
import { UfastValidatorsRuleService } from "./infra/validators/validatorsRule.service";
import { CompanyServiceNs } from "./trans/company.service";
import { DeptServiceNs } from "./common-services/dept.service";
import { EventBusService } from './common-services/event-bus.service';
/**
* 定义拦截器顺序，
 * 参考：https://angular.cn/guide/http#interceptor-order
**/
const httpInterceptorProvider = [
  { provide:HTTP_INTERCEPTORS,useClass:DefaultInterceptor,multi:true},
  { provide:HTTP_INTERCEPTORS,useClass:UfastCodeInterceptor,multi:true}
];


@NgModule({
  imports:[
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers:[
    HttpUtilNs.HttpUtilService,
    httpInterceptorProvider,
    UserServiceNs.UserService,
    MenuServiceNs.MenuService,
    ScepterServiceNs.ScepterService,

    UfastValidatorsRuleService,
    UfastValidatorsService,
    CompanyServiceNs.CompanyService,
    ScepterServiceNs.ScepterService,
    DeptServiceNs.DeptService,
    EventBusService
  ]
})
export class CoreModule{}
