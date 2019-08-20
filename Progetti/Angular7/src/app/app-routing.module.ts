import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { StrumentoFormComponent } from './strumento/strumento-form/strumento-form.component';
import { StrumentiComponent } from './strumento/strumenti/strumenti.component';
import { UtentiComponent } from './user/utenti/utenti.component';
import { DettaglioPrenotazioneFormComponent } from './prenotazione/dettaglio-prenotazione-form/dettaglio-prenotazione-form.component';
import { CarrelloComponent } from './prenotazione/carrello/carrello.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione/prenotazione.component';
import { ChangePwdFormComponent } from './user/change-pwd-form/change-pwd-form.component';
import { StrumentiProvvisoriComponent } from './strumento/strumenti-provvisori/strumenti-provvisori.component';
import { DashboardComponent } from './bi/dashboard/dashboard.component';
import { SectionStatusComponent } from './bi/section-status/section-status.component';
import { SectionPrenotazioniComponent } from './bi/section-prenotazioni/section-prenotazioni.component';
import { SectionVolumeComponent } from './bi/section-volume/section-volume.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { StrumentoComponent } from './strumento/strumento.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
{path:'',redirectTo:'/login',pathMatch:'full'},
{
  path:'bi',component :DashboardComponent,
  children:[
 {path:'status',component :SectionStatusComponent,canActivate:[AuthGuard]},
{path:'prenotazioni',component :SectionPrenotazioniComponent,canActivate:[AuthGuard]},
{path:'volume',component :SectionVolumeComponent,canActivate:[AuthGuard]}],
canActivate:[AuthGuard]},
{ path:'app',component:MainDashboardComponent, 
children:[
 
  {path:'home',component :HomeComponent,canActivate:[AuthGuard]},
 
  {path:'strumento',component:StrumentoComponent,
  children:[
    {path:'strumenti',component :StrumentiComponent,canActivate:[AuthGuard]},
    {path:'form',component :StrumentoFormComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato','UtenteBase']}},
    {path:'prov',component :StrumentiProvvisoriComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}}
  ],canActivate:[AuthGuard]},
  {path:'utente',component:UserComponent,
    children:[
      {path:'utenti',component :UtentiComponent,canActivate:[AuthGuard], data: {permittedRoles:['Admin','UtenteAutorizzato']}},
      {path:'registration',component:RegistrationComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}}
    ],canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},

  {path:'prenotazione',component :PrenotazioneComponent,canActivate:[AuthGuard]},
  {path:'changePwd',component :ChangePwdFormComponent,canActivate:[AuthGuard]},
  
  {path:'carrello',component :CarrelloComponent,canActivate:[AuthGuard]},
  {path:'dettaglioPrenotazioneForm',component :DettaglioPrenotazioneFormComponent,canActivate:[AuthGuard]}
],canActivate:[AuthGuard]},

{path:'login',component:LoginComponent},
{path:'forbidden',component :ForbiddenComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
