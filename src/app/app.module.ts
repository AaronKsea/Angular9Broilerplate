import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { authinterceptor } from './auth-interceptor.service'
import { loggingInterceptorservice } from './loggingInterceptor.service'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authinterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loggingInterceptorservice,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
