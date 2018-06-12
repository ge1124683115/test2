import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './login-page/login.component';




const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  {
    path: 'main', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'workboard', pathMatch: 'full'},
      { path: 'workboard', loadChildren: './workboard/workboard.module#WorkboardModule' },
      { path: 'companyManage', loadChildren: './company-manage/company-manage.module#CompanyManageModule' },
      { path: 'dataStatistics', loadChildren: './data-statistics/data-statistics.module#DataStatisticsModule' }
    ]
  },
  //{ path: '**', redirectTo: 'main/workboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [ RouterModule ]
})
export class ViewsRoutingModule{ }
