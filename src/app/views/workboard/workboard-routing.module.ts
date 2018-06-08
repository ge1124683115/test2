import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkboardContentComponent } from './workboard-content/workboard-content.component';


const routes: Routes = [
  { path: '', redirectTo: 'content', pathMatch: 'full' },
  { path: 'content', component: WorkboardContentComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WorkboardRoutingModule{}
