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
import { StrumentoViewComponent } from './strumento/strumento-view/strumento-view.component';
import { NotificationsComponent } from './home/notifications/notifications.component';
import { UpdateFormComponent } from './strumento/update-form/update-form.component';
import { GestioneStrumentiComponent } from './home/gestione-strumenti/gestione-strumenti.component';
import { PrenotazioniVicineComponent } from './home/prenotazioni-vicine/prenotazioni-vicine.component';
import { PrenotazioniComponent } from './home/prenotazioni/prenotazioni.component';
import { ChartStrumentoComponent } from './bi/chart-strumento/chart-strumento.component';
import { ModificaPrenotazioneComponent } from './home/modifica-prenotazione/modifica-prenotazione.component';
import { NotificheDelicateComponent } from './home/notifiche-delicate/notifiche-delicate.component';
import { PrenotazioniEffettuateComponent } from './home/prenotazioni-effettuate/prenotazioni-effettuate.component';
import { FormRiconsegnaComponent } from './home/form-riconsegna/form-riconsegna.component';
import { PasswordFormComponent } from './user/password-form/password-form.component';


const routes: Routes = [
{path:'',redirectTo:'/login',pathMatch:'full'},
{
  path:'bi',component :DashboardComponent,
  children:[
 {path:'status',component :SectionStatusComponent,canActivate:[AuthGuard]},
 {path:'strumento',component :ChartStrumentoComponent ,canActivate:[AuthGuard]},
{path:'prenotazioni',component :SectionPrenotazioniComponent,canActivate:[AuthGuard]},
{path:'volume',component :SectionVolumeComponent,canActivate:[AuthGuard]}],
canActivate:[AuthGuard]},
{ path:'app',component:MainDashboardComponent, 
children:[
 
  {path:'home',component :HomeComponent,
  children:[
    {path:'prenotazioni',component :PrenotazioniComponent,canActivate:[AuthGuard]},
    {path:'prenotazioniEffettuate',component :PrenotazioniEffettuateComponent,canActivate:[AuthGuard]},
    {path:'formRiconsegna',component :FormRiconsegnaComponent,canActivate:[AuthGuard]},
    {path:'modificaPrenotazione',component :ModificaPrenotazioneComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},
    {path:'notificheStrumento',component :NotificationsComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},
    {path:'gestioneStrumenti',component :GestioneStrumentiComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},
    {path:'prenotazioniVicine',component :PrenotazioniVicineComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin','UtenteAutorizzato']}},
    {path:'prenotazioniDelicate',component :NotificheDelicateComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin','UtenteAutorizzato']}}
  ],
  canActivate:[AuthGuard]},
 
  {path:'strumento',component:StrumentoComponent,
  children:[
    {path:'strumenti',component :StrumentiComponent,canActivate:[AuthGuard]},
    {path:'strumentoView',component :StrumentoViewComponent,canActivate:[AuthGuard]},
    {path:'updateForm',component :UpdateFormComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin','UtenteAutorizzato']}},
    {path:'dettaglioPrenotazioneForm',component :DettaglioPrenotazioneFormComponent,canActivate:[AuthGuard]},
    {path:'form',component :StrumentoFormComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato','UtenteBase']}},
    {path:'prov',component :StrumentiProvvisoriComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}}
  ],canActivate:[AuthGuard]},
  {path:'utente',component:UserComponent,
    children:[
      {path:'passwordForm',component :PasswordFormComponent,canActivate:[AuthGuard], data: {permittedRoles:['Admin']}},
      {path:'utenti',component :UtentiComponent,canActivate:[AuthGuard], data: {permittedRoles:['Admin','UtenteAutorizzato']}},
      {path:'registration',component:RegistrationComponent,canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}}
    ],canActivate:[AuthGuard], data:{permittedRoles:['Admin','UtenteAutorizzato']}},

  {path:'prenotazione',component :PrenotazioneComponent,canActivate:[AuthGuard]},
  {path:'changePwd',component :ChangePwdFormComponent,canActivate:[AuthGuard]},
  
  {path:'carrello',component :CarrelloComponent,canActivate:[AuthGuard]},
  
],canActivate:[AuthGuard]},

{path:'login',component:LoginComponent},
{path:'forbidden',component :ForbiddenComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
