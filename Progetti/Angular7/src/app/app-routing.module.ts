import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StrumentoFormComponent } from './strumento/strumento-form/strumento-form.component';
import { StrumentiComponent } from './strumento/strumenti/strumenti.component';
import { UtentiComponent } from './home/utenti/utenti.component';


const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {path:'user',component:UserComponent,
children:[
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent}
]},
{path:'home',component :HomeComponent,canActivate:[AuthGuard]},
{path:'strumentoForm',component :StrumentoFormComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},
{path:'forbidden',component :ForbiddenComponent},
{path:'strumenti',component :StrumentiComponent},
{path:'utenti',component :UtentiComponent},
{path:'adminpanel',component :AdminPanelComponent,canActivate:[AuthGuard], data :{permittedRoles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
