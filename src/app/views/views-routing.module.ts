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
      { path: 'company', loadChildren: './company/company.module#CompanyModule' },
    ]
  },
  { path: '**', redirectTo: 'main/workboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [ RouterModule ]
})
export class ViewsRoutingModule{ }
