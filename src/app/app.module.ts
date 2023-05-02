import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { AppComponent } from './main/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { StartPageComponent } from './start-page/start-page.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';
import { LoginHttpService } from './login-http.service';
import { ResponseViewComponent } from './response-view/response-view.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GalleryEditionComponent } from './gallery-edition/gallery-edition.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LightboxModule } from 'ngx-lightbox';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryService } from './gallery.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor.service';
import { RegisterService } from './register.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SettingsComponent } from './settings/settings.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PasswordChangeComponent } from './password-change/password-change.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    OrderComponent,
    OrdersListComponent,
    StartPageComponent,
    ForgottenPasswordComponent,
    RegisterConfirmationComponent,
    ResponseViewComponent,
    GalleryEditionComponent,
    FileUploadComponent,
    GalleryComponent,
    SpinnerComponent,
    ConfirmationComponent,
    SettingsComponent,
    OrderDetailsComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LightboxModule ,
   
    
    HttpClientModule,
    
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    
    MatDatepickerModule,
    MatNativeDateModule,

    FormsModule,
    ReactiveFormsModule,

    
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl'},
    {provide : HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true},
    {provide : HTTP_INTERCEPTORS,
      useClass : ErrorInterceptorService,
      multi : true

    },
    
    GalleryService,
    LoginHttpService,
    RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
