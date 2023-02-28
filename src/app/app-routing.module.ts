import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { GalleryEditionComponent } from './gallery-edition/gallery-edition.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { ResponseViewComponent } from './response-view/response-view.component';
import { SettingsComponent } from './settings/settings.component';
import { StartPageComponent } from './start-page/start-page.component';


const routes: Routes = [

{path : 'login' , component : LoginComponent},
{path : 'register', component : RegisterComponent},
{path : 'start', component : StartPageComponent },
{path : 'order', component : OrderComponent },
{path : 'forgottenPassword', component : ForgottenPasswordComponent},
{path : 'ordersList', component : OrdersListComponent },
{path :'responseView/:response', component : ResponseViewComponent},
{path: 'galleryEdition', component : GalleryEditionComponent},
{path : 'fileUpload', component : FileUploadComponent},
{path : 'gallery', component : GalleryComponent},
{path : 'confirmRegistration/:token', component: RegisterConfirmationComponent},
{path : 'confirmation', component : ConfirmationComponent},
{path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true, enableTracing:true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
