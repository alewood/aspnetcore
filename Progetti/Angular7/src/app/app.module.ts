import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { StrumentoFormComponent } from './strumento/strumento-form/strumento-form.component';
import { StrumentiComponent } from './strumento/strumenti/strumenti.component';
import { UtentiComponent } from './user/utenti/utenti.component';
import { DettaglioPrenotazioneFormComponent } from './prenotazione/dettaglio-prenotazione-form/dettaglio-prenotazione-form.component';
import { CarrelloComponent } from './prenotazione/carrello/carrello.component';
import { DatePipe } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { PrenotazioneComponent } from './prenotazione/prenotazione/prenotazione.component';
import { FilterPipe } from "./filter-pipe";
import { ChangePwdFormComponent } from './user/change-pwd-form/change-pwd-form.component';
import { StrumentiProvvisoriComponent } from './strumento/strumenti-provvisori/strumenti-provvisori.component';
import { UploadComponent } from './strumento/upload/upload.component';
import { NavbarComponent } from './bi/navbar/navbar.component';
import { SidebarComponent } from './bi/sidebar/sidebar.component';
import { DashboardComponent } from './bi/dashboard/dashboard.component';
import { SectionPrenotazioniComponent } from './bi/section-prenotazioni/section-prenotazioni.component';
import { SectionStatusComponent } from './bi/section-status/section-status.component';
import { SectionVolumeComponent } from './bi/section-volume/section-volume.component';
import { BarChartComponent } from './bi/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './bi/charts/line-chart/line-chart.component';
import {ChartsModule  } from "ng2-charts";
import { PieChartComponent } from './bi/charts/pie-chart/pie-chart.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { StrumentoComponent } from './strumento/strumento.component';
import { UserComponent } from './user/user.component';
import { UserSidebarComponent } from './user/user-sidebar/user-sidebar.component';
import { StrumentoSidebarComponent } from './strumento/strumento-sidebar/strumento-sidebar.component';
import { StrumentoViewComponent } from './strumento/strumento-view/strumento-view.component';
import { HomeSidebarComponent } from './home/home-sidebar/home-sidebar.component';
import { TextParseComponent } from './strumento/upload/text-parse/text-parse.component';
import { NotificationsComponent } from './home/notifications/notifications.component';
import { UpdateFormComponent } from './strumento/update-form/update-form.component';
import { GestioneStrumentiComponent } from './home/gestione-strumenti/gestione-strumenti.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PrenotazioniVicineComponent } from './home/prenotazioni-vicine/prenotazioni-vicine.component';
import {MatButtonToggleModule,MatSelectModule,MatRadioModule,MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule} from '@angular/material';
import { PrenotazioniComponent } from './home/prenotazioni/prenotazioni.component';
import { ChartStrumentoComponent } from './bi/chart-strumento/chart-strumento.component';
import { ModificaPrenotazioneComponent } from './home/modifica-prenotazione/modifica-prenotazione.component';
import { NotificheDelicateComponent } from './home/notifiche-delicate/notifiche-delicate.component';
import {SatDatepickerModule,SatNativeDateModule} from 'saturn-datepicker';
import { PrenotazioniEffettuateComponent } from './home/prenotazioni-effettuate/prenotazioni-effettuate.component';
import { FormRiconsegnaComponent } from './home/form-riconsegna/form-riconsegna.component';
import { PasswordFormComponent } from './user/password-form/password-form.component';
 import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenComponent,
    StrumentoFormComponent,
    StrumentiComponent,
    UtentiComponent,
    DettaglioPrenotazioneFormComponent,
    CarrelloComponent,
    PrenotazioneComponent,
    FilterPipe,
    ChangePwdFormComponent,
    StrumentiProvvisoriComponent,
    UploadComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    SectionPrenotazioniComponent,
    SectionStatusComponent,
    SectionVolumeComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    MainDashboardComponent,
    StrumentoComponent,
    UserComponent,
    UserSidebarComponent,
    StrumentoSidebarComponent,
    StrumentoViewComponent,
    HomeSidebarComponent,
    TextParseComponent,
    NotificationsComponent,
    UpdateFormComponent,
    GestioneStrumentiComponent,
    PaginationComponent,
    PrenotazioniVicineComponent,
    PrenotazioniComponent,
    ChartStrumentoComponent,
    ModificaPrenotazioneComponent,
    NotificheDelicateComponent,
    PrenotazioniEffettuateComponent,
    FormRiconsegnaComponent,
    PasswordFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ChartsModule,
    MatSelectModule,
    MatButtonToggleModule,  
    MatRadioModule,
      SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule, 
    MatInputModule,
     MatNativeDateModule,
      MatButtonModule,
      NgxDaterangepickerMd,
     
  
      

    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule
  ],
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },DatePipe,CookieService,FilterPipe],
  bootstrap: [AppComponent]
 
})
export class AppModule {
  
 }
