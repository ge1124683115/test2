import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViewsRoutingModule } from './views-routing.module';
import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './login-page/login.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ViewsRoutingModule,
    NgZorroAntdModule,
    CoreModule,
    LayoutModule,
    FormsModule,
  ],
  declarations: [
    MainLayoutComponent,
    LoginComponent,
  ],

  exports: [ ViewsRoutingModule]
})
export class ViewsModule {}
