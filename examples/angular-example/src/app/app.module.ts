import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {
  AOTP11AngularDashboardModule,
  AOTP11AngularStatusBarModule,
  AOTP11AngularDragDropModule,
  AOTP11AngularProgressBarModule,
  AOTP11AngularDashboardModalModule,
} from '@AOTP11' +
  /angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AOTP11AngularDashboardModule,
    AOTP11AngularStatusBarModule,
    AOTP11AngularDashboardModalModule,
    AOTP11AngularDragDropModule,
    AOTP11AngularProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
