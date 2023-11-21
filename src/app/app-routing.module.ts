import {
   NgModule
} from '@angular/core';
import {
   RouterModule,
   Routes
} from '@angular/router';
import {
   LoginComponent
} from './component/login/login.component';
import {
   DashboardComponent
} from './component/dashboard/dashboard.component';
import {
   DashboardAdminComponent
} from './component/dashboard-admin/dashboard-admin.component';
import {
   RegisterComponent
} from './component/register/register.component';
import {
   HomeComponent
} from './component/home/home.component';
import {
   AuthGuard
} from './guard/auth.guard';
import {
   AuthAdminGuard
} from './guard/authadmin.guard';
import {
   DashHomeComponent
} from './dash-components/dash-home/dash-home.component';
import {
   TrainingComponent
} from './dash-components/training/training.component';
import {
   ChatComponent
} from './dash-components/chat/chat.component';
import {
   NotificationComponent
} from './dash-components/notification/notification.component';
import {
   AdminHomeComponent
} from './admin-components/admin-home/admin-home.component';
import {
   AdminChatComponent
} from './admin-components/admin-chat/admin-chat.component';
import {
   AdminNotificationComponent
} from './admin-components/admin-notification/admin-notification.component';
import { AdminEventComponent } from './admin-components/admin-event/admin-event.component';
import { EventsComponent } from './dash-components/events/events.component';
import { ScheduleComponent } from './dash-components/schedule/schedule.component';
import { CompanyApplicationComponent } from './component/company-application/company-application.component';
import { CompaniesComponent } from './admin-components/companies/companies.component';

const routes: Routes = [{
   path: '',
   redirectTo: 'home',
   pathMatch: 'full'
},
   {
      path: 'home',
      component: HomeComponent
   },
   {
      path: 'login',
      component: LoginComponent
   },
   {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      children: [{
         path: '',
         redirectTo: 'home',
         pathMatch: 'full'
      },
         {
            path: 'home',
            component: DashHomeComponent
         },
         {
            path: 'training',
            component: TrainingComponent
         },
         {
            path: 'chat',
            component: ChatComponent
         },
         {
            path: 'notification',
            component: NotificationComponent
         },
         {
            path: 'events',
            component: EventsComponent
         },
         {
            path: 'schedule',
            component: ScheduleComponent
         },
         
      ]
   },
   {
      path: 'dashboardadmin',
      component: DashboardAdminComponent,
      canActivate: [AuthAdminGuard],
      children: [{
         path: '',
         redirectTo: 'home',
         pathMatch: 'full'
      },
         {
            path: 'home',
            component: AdminHomeComponent
         },
         {
            path: 'chat',
            component: AdminChatComponent
         },
         {
            path: 'notification',
            component: AdminNotificationComponent
         },
         {
            path: 'event',
            component: AdminEventComponent
         },
         {
            path: 'companies',
            component: CompaniesComponent
         }
         ]
   },
   {
      path: 'register',
      component: RegisterComponent
   },
   {
      path: 'company-application',
      component: CompanyApplicationComponent
   }];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}