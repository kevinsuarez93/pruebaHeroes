import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BlockUIModule } from 'ng-block-ui'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { GenericService } from './shared/interceptor/generic.service'
import { SharedModule } from './shared/shared.module'
import { ErrorPageComponent } from './shared/error-page/error-page.component'

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BlockUIModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GenericService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
