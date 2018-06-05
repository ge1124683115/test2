/**
 * 此模块内的组件仅供此模块内的服务调用，全局注册此模块的内的服务。
 * **/

import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule,NZ_MESSAGE_CONFIG } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginModalComponent,LoginModalService } from "./login-modal/login-modal";
import { ShowMessageService } from "./show-message/show-message";

@NgModule({
  imports:[
    NgZorroAntdModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations:[
    LoginModalComponent
  ],
  providers:[
    LoginModalService,
    ShowMessageService,
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 2000} }
  ],
  entryComponents:[
    LoginModalComponent
  ]
})
export class WidgetModule{}
