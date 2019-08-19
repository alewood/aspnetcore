import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { StrumentoFormComponent } from './strumento/strumento-form/strumento-form.component';
import { StrumentiComponent } from './strumento/strumenti/strumenti.component';
import { UtentiComponent } from './home/utenti/utenti.component';
import { DettaglioPrenotazioneFormComponent } from './prenotazione/dettaglio-prenotazione-form/dettaglio-prenotazione-form.component';
import { CarrelloComponent } from './prenotazione/carrello/carrello.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione/prenotazione.component';
import { ChangePwdFormComponent } from './user/change-pwd-form/change-pwd-form.component';
import { StrumentiProvvisoriComponent } from './strumento/strumenti-provvisori/strumenti-provvisori.component';
import { DashboardComponent } from './bi/dashboard/dashboard.component';


const routes: Routes = [
{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'bi',component :DashboardComponent,canActivate:[AuthGuard]},
{path:'registration',component:RegistrationComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},
{path:'login',component:LoginComponent},
{path:'home',component :HomeComponent,canActivate:[AuthGuard]},
{path:'strumentoForm',component :StrumentoFormComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato','UtenteBase']}},
{path:'forbidden',component :ForbiddenComponent},
{path:'strumenti',component :StrumentiComponent,canActivate:[AuthGuard]},
{path:'strumenti/prov',component :StrumentiProvvisoriComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},
{path:'prenotazione',component :PrenotazioneComponent,canActivate:[AuthGuard]},
{path:'dettaglioPrenotazioneForm',component :DettaglioPrenotazioneFormComponent,canActivate:[AuthGuard]},
{path:'carrello',component :CarrelloComponent,canActivate:[AuthGuard]},
{path:'changePwd',component :ChangePwdFormComponent,canActivate:[AuthGuard]},
{path:'utenti',component :UtentiComponent,canActivate:[AuthGuard], data: {permittedRoles:['Admin','UtenteAutorizzato']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
