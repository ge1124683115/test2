import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {PhotoTypePipe} from './pipes/photo-type.pipe';
import {AuditStatusPipe} from './pipes/audit-status.pipe';
import {SideNavToggleDirective} from './side-nav-toggle.directive';

@NgModule({
  imports: [
    NgZorroAntdModule,
  ],
  exports: [
    PhotoTypePipe,
    AuditStatusPipe
  ],
  declarations: [
    PhotoTypePipe,
    AuditStatusPipe,
    SideNavToggleDirective
  ]
})
export class DirectivesModule {
}
