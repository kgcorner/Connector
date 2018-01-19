import { FundService } from './services/fund.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApproveComponent } from './approve/approve.component';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ApproveComponent,
    ViewComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [FundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
