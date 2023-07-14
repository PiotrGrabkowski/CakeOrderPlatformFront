import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { GalleryEditionComponent } from './gallery-edition/gallery-edition.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order/order.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { ResponseViewComponent } from './response-view/response-view.component';
import { SettingsComponent } from './settings/settings.component';
import { StartPageComponent } from './start-page/start-page.component';
import { UserByadminEditionComponent } from './user-byadmin-edition/user-byadmin-edition.component';
import { UserEditionListComponent } from './user-edition-list/user-edition-list.component';
import { UserSelfEditionComponent } from './user-self-edition/user-self-edition.component';



const routes: Routes = [

{path : 'login' , component : LoginComponent},
{path : 'register', component : RegisterComponent},
{path : 'start', component : StartPageComponent },
{path : 'order', component : OrderComponent },
{path : 'forgottenPassword', component : ForgottenPasswordComponent},
{path : 'ordersList/:user', component : OrdersListComponent },
{path : 'orderDetails/:id/:user', component : OrderDetailsComponent},
{path :'responseView/:response', component : ResponseViewComponent},
{path: 'galleryEdition', component : GalleryEditionComponent},
{path : 'fileUpload', component : FileUploadComponent},
{path : 'gallery', component : GalleryComponent},
{path : 'confirm/:action/:token', component: RegisterConfirmationComponent},
{path : 'confirmation', component : ConfirmationComponent},
{path: 'settings', component: SettingsComponent},
{path : 'passwordChange', component : PasswordChangeComponent},
{path : 'userSelfEdition', component : UserSelfEditionComponent},
{path : 'user_list', component : UserEditionListComponent},
{path : 'user_by_admin_edition/:id', component : UserByadminEditionComponent},



{path : '', component : StartPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
