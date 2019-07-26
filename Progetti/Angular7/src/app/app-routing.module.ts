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
import { DettaglioPrenotazioneFormComponent } from './prenotazione/dettaglio-prenotazione-form/dettaglio-prenotazione-form.component';
import { CarrelloComponent } from './prenotazione/carrello/carrello.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione/prenotazione.component';
import { ChangePwdFormComponent } from './user/change-pwd-form/change-pwd-form.component';


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
{path:'strumenti',component :StrumentiComponent,canActivate:[AuthGuard]},
{path:'prenotazione',component :PrenotazioneComponent,canActivate:[AuthGuard]},
{path:'dettaglioPrenotazioneForm',component :DettaglioPrenotazioneFormComponent,canActivate:[AuthGuard]},
{path:'carrello',component :CarrelloComponent,canActivate:[AuthGuard]},
{path:'changePwd',component :ChangePwdFormComponent,canActivate:[AuthGuard]},
{path:'utenti',component :UtentiComponent,canActivate:[AuthGuard], data: {permittedRoles:['Admin']}},
{path:'adminpanel',component :AdminPanelComponent,canActivate:[AuthGuard], data :{permittedRoles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
