import {
   NgModule
} from '@angular/core';
import {
   BrowserModule
} from '@angular/platform-browser';
import {
   BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
   provideFirebaseApp,
   getApp,
   initializeApp
} from '@angular/fire/app';
import {
   AppRoutingModule
} from './app-routing.module';
import {
   AppComponent
} from './app.component';
import {
   MatSidenavModule
} from '@angular/material/sidenav';
import {
   MatToolbarModule
} from '@angular/material/toolbar';
import {
   MatMenuModule
} from '@angular/material/menu';
import {
   MatIconModule
} from '@angular/material/icon';

import {
   MatFormFieldModule
} from '@angular/material/form-field';
import {
   MatDividerModule
} from '@angular/material/divider';
import {
   MatListModule
} from '@angular/material/list';
import {
   MatCardModule
} from '@angular/material/card';
import {
   MatButtonModule
} from '@angular/material/button';
import {
   MatDialogModule
} from '@angular/material/dialog';
import {
   MatNativeDateModule
} from '@angular/material/core';
import {
   MatDatepickerModule
} from '@angular/material/datepicker';
import {
   MatSelectModule
} from '@angular/material/select';
import {
   MatInputModule
} from '@angular/material/input';
import {
   environment
} from '../environments/environment';
import {
   AngularFireModule
} from '@angular/fire/compat';
import {
   provideFirestore,
   getFirestore
} from '@angular/fire/firestore';
import {
   FormsModule
} from '@angular/forms';
import {
   getMessaging,
   provideMessaging
} from '@angular/fire/messaging';
import {
   getStorage,
   provideStorage
} from '@angular/fire/storage';
import {
   HomeComponent
} from './component/home/home.component';
import {
   DashboardAdminComponent
} from './component/dashboard-admin/dashboard-admin.component';
import {
   DashHomeComponent
} from './dash-components/dash-home/dash-home.component';
import {
   HeaderComponent
} from './dash-components/header/header.component';
import {
   RegisterComponent
} from './component/register/register.component';
import {
   LoginComponent
} from './component/login/login.component';
import {
   SidenavComponent
} from './dash-components/sidenav/sidenav.component';
import {
   DashboardComponent
} from './component/dashboard/dashboard.component';
import {
   TrainingComponent
} from './dash-components/training/training.component';
import {
   AdminHomeComponent
} from './admin-components/admin-home/admin-home.component';
import {
   AdminHeaderComponent
} from './admin-components/admin-header/admin-header.component';
import {
   AdminSidenavComponent
} from './admin-components/admin-sidenav/admin-sidenav.component';
import {
   AdminChatComponent
} from './admin-components/admin-chat/admin-chat.component';
import {
   HttpClientModule
} from '@angular/common/http';
import {
   QuizComponent
} from './quiz/quiz/quiz.component';
import {
   ResultComponent
} from './quiz/result/result.component';
import {
   MessageComponent
} from './admin-components/admin-chat/message/message.component';
import {
   ChatComponent
} from './dash-components/chat/chat.component';
import {
   NotificationComponent
} from './dash-components/notification/notification.component';
import {
   AdminNotificationComponent
} from './admin-components/admin-notification/admin-notification.component';
import {
   AdminEventComponent
} from './admin-components/admin-event/admin-event.component';
import {
   EventsComponent
} from './dash-components/events/events.component';
import {
   ScheduleComponent
} from './dash-components/schedule/schedule.component';
import {
   CompanyApplicationComponent
} from './component/company-application/company-application.component';
import {
   CompaniesComponent
} from './admin-components/companies/companies.component';
import {
   ToastrModule
} from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';
import {
   animate
} from '@angular/animations';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      DashboardComponent,
      HomeComponent,
      DashboardAdminComponent,
      DashHomeComponent,
      HeaderComponent,
      SidenavComponent,
      TrainingComponent,
      AdminHomeComponent,
      AdminHeaderComponent,
      AdminSidenavComponent,
      AdminChatComponent,
      QuizComponent,
      ResultComponent,
      MessageComponent,
      ChatComponent,
      NotificationComponent,
      AdminNotificationComponent,
      AdminEventComponent,
      EventsComponent,
      ScheduleComponent,
      CompanyApplicationComponent,
      CompaniesComponent,
      ConfirmationDialogComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      ClipboardModule,
      ToastrModule.forRoot({
         timeOut: 2500,
         positionClass: 'toast-bottom-center',
         preventDuplicates: true,
         progressBar: true,
         progressAnimation: 'decreasing',
      }),


      //firebase import
      AngularFireModule.initializeApp(environment.firebase),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      FormsModule,

      provideFirestore(()=>getFirestore()),
      provideStorage(()=> getStorage()),
      provideMessaging(() => getMessaging()),

      // Material Imports
      MatSidenavModule,
      MatToolbarModule,
      MatMenuModule,
      MatIconModule,
      MatDividerModule,
      MatListModule,
      MatButtonModule,
      MatDialogModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatDatepickerModule,
      MatSelectModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {}