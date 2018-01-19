import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';
import { ApproveComponent } from './approve/approve.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [  
    {path:'approve', component:ApproveComponent},
    {path:'view', component:ViewComponent},
    {path:'', component:UploadComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }