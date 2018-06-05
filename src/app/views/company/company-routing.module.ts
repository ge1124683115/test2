import { NgModule} from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { LevelManageComponent } from "./level-manage/level-manage.component"
import { InfoManageComponent } from "./info-manage/info-manage.component";

const routes: Routes = [
  { path:"",redirectTo:"companyInfoManage",pathMatch:"full" },
  { path:"companyInfoManage",component:InfoManageComponent},
  { path:"companyLevelManage",component:LevelManageComponent }

];


@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CompanyRoutingModule{}
