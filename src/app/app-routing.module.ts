import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TmAdminComponent} from './components/tm-admin/tm-admin.component';
import { CorporateCompanyComponent} from './components/corporate-company/corporate-company.component';
import { TravelCompanyComponent} from './components/travel-company/travel-company.component';
import { CorporateCompanyLoginComponent} from './components/corporate-company/corporate-company-login/corporate-company-login.component';
import { CorporateUpdateUserComponent} from './components/corporate-company/corporate-update-user/corporate-update-user.component';
import { TmAdminLoginComponent} from './components/tm-admin/tm-admin-login/tm-admin-login.component';
import { TmAdminDashboardComponent} from './components/tm-admin/tm-admin-dashboard/tm-admin-dashboard.component';
import { TravelCompanyLoginComponent} from './components/travel-company/travel-company-login/travel-company-login.component';
import { TravelCompanyDashboardComponent} from './components/travel-company/travel-company-dashboard/travel-company-dashboard.component';
import { LandingPageComponent} from './components/landing-page/landing-page.component';
import { CorporateCompanyHomeComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-home/corporate-company-home.component';
import { CorporateCompanyNewRequestComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-new-request/corporate-company-new-request.component';
import { CorporateCompanyMyRequestsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-my-requests/corporate-company-my-requests.component';
import { CorporateCompanyTeamRequestsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-team-requests/corporate-company-team-requests.component';
import { CorporateCompanyTeamMembersComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-team-members/corporate-company-team-members.component';
import { CorporateCompanySettingsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-settings/corporate-company-settings.component';
import { TmAdminHomeComponent } from './components/tm-admin/tm-admin-dashboard/tm-admin-home/tm-admin-home.component';
import { TmAdminProfileComponent } from './components/tm-admin/tm-admin-dashboard/tm-admin-profile/tm-admin-profile.component';
import { TmAdminSettingsComponent } from './components/tm-admin/tm-admin-dashboard/tm-admin-settings/tm-admin-settings.component';
import { TmAdminCompaniesComponent } from './components/tm-admin/tm-admin-dashboard/tm-admin-companies/tm-admin-companies.component';
import { TmAdminUsersComponent } from './components/tm-admin/tm-admin-dashboard/tm-admin-users/tm-admin-users.component';
import { TmAdminGuard } from './guards/tm-admin.guard';
import { CorporateCompanyGuard } from './guards/corporate-company.guard';
import { TravelCompanyGuard } from './guards/travel-company.guard';
import { CorporateCompanyDashboardComponent} from './components/corporate-company/corporate-company-dashboard/corporate-company-dashboard.component';
import { CorporateCompanyUserComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-user/corporate-company-user.component';
import { CorporateCompanyProfileComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-profile/corporate-company-profile.component';
import { CorporateCompanyRegistrationComponent } from './components/corporate-company/corporate-company-registration/corporate-company-registration.component';
import { TravelCompanyRegistrationComponent } from './components/travel-company/travel-company-registration/travel-company-registration.component';
import { TravelCompanyHomeComponent } from './components/travel-company/travel-company-dashboard/travel-company-home/travel-company-home.component';
import { CorporateCompanyRequestDetailsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-request-details/corporate-company-request-details.component';
import { TravelCompanyUsersComponent } from './components/travel-company/travel-company-dashboard/travel-company-users/travel-company-users.component';
import { TravelCompanyProfileComponent } from './components/travel-company/travel-company-dashboard/travel-company-profile/travel-company-profile.component';
import { TravelCompanySettingComponent } from './components/travel-company/travel-company-dashboard/travel-company-setting/travel-company-setting.component';
import { CorporateCompanyMappingComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-mapping/corporate-company-mapping.component'
import { TravelCompanyMappingComponent } from './components/travel-company/travel-company-dashboard/travel-company-mapping/travel-company-mapping.component';
import { TravelCompanyMyRequestsComponent } from './components/travel-company/travel-company-dashboard/travel-company-my-requests/travel-company-my-requests.component';
import { TravelCompanyRequestDetailsComponent } from './components/travel-company/travel-company-dashboard/travel-company-request-details/travel-company-request-details.component';
import { CorporateUserProfileComponent } from './components/corporate-company/corporate-company-dashboard/corporate-user-profile/corporate-user-profile.component';
import { TravelUserProfileComponent } from './components/travel-company/travel-company-dashboard/travel-user-profile/travel-user-profile.component';
import { TravelCompanyForgotPasswordComponent } from './components/travel-company/travel-company-forgot-password/travel-company-forgot-password.component';
import { CorporateCompanyForgotPasswordComponent } from './components/corporate-company/corporate-company-forgot-password/corporate-company-forgot-password.component';
import { TmAdminForgotPasswordComponent } from './components/tm-admin/tm-admin-forgot-password/tm-admin-forgot-password.component';
import { TravelCompanyTeamMembersComponent } from './components/travel-company/travel-company-dashboard/travel-company-team-members/travel-company-team-members.component';
import { CorporateCompanyAllRequestsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-all-requests/corporate-company-all-requests.component'
import { TravelCompanyAllRequestsComponent } from './components/travel-company/travel-company-dashboard/travel-company-all-requests/travel-company-all-requests.component';
import { CorporateCompanyReportsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-reports/corporate-company-reports.component';
import { TravelCompanyReportsComponent } from './components/travel-company/travel-company-dashboard/travel-company-reports/travel-company-reports.component';

const routes: Routes = [

	{
		path:'',
		component : LandingPageComponent
	},

  {
    path:'tm-admin',
    component:TmAdminComponent,
    children:[
      {
        path:'login',
        component:TmAdminLoginComponent
      },
      {
        path:'forgot-password',
        component:TmAdminForgotPasswordComponent
      },
      {
        path:'dashboard',
        component:TmAdminDashboardComponent,
        canActivate : [TmAdminGuard],
        children:[
          {
            path:'home',
            component:TmAdminHomeComponent
          },
          {
            path:'companies',
            component:TmAdminCompaniesComponent
          },
          {
            path:'profile',
            component:TmAdminProfileComponent
          },
          
          {
            path:'settings',
            component:TmAdminSettingsComponent
          },
          {
            path:'users',
            component:TmAdminUsersComponent
          }
        ]
      }
    ]
  },

	{
		path:'corporate-company',
		component:CorporateCompanyComponent,
		children:[
			{
				path:'login',
				component:CorporateCompanyLoginComponent
			},
			{
				path:'update-user',
				component:CorporateUpdateUserComponent
			},
      {
        path:'forgot-password',
        component:CorporateCompanyForgotPasswordComponent
      },
      {
        path:'registration',
        component:CorporateCompanyRegistrationComponent
      },
			{
				path:'dashboard',
				component:CorporateCompanyDashboardComponent,
        canActivate : [CorporateCompanyGuard],
        children:[
          {
            path:'home',
            component:CorporateCompanyHomeComponent
          },
          
          {
            path:'new-request',
            component:CorporateCompanyNewRequestComponent
          },
          {
            path:'my-requests',
            component:CorporateCompanyMyRequestsComponent
          },
          {
            path:'all-requests',
            component:CorporateCompanyAllRequestsComponent
          },
          {
            path:'request-details/:RequestId',
            component:CorporateCompanyRequestDetailsComponent
          },
          {
            path:'team-requests',
            component:CorporateCompanyTeamRequestsComponent
          },
          {
            path:'team-members',
            component:CorporateCompanyTeamMembersComponent
          },
          {
            path:'settings',
            component:CorporateCompanySettingsComponent
          },
          {
            path:'company-profile',
            component:CorporateCompanyProfileComponent
          },
          {
            path:'users',
            component:CorporateCompanyUserComponent
          },
          {
            path:'mapping',
            component:CorporateCompanyMappingComponent
          },
          {
            path:'user-profile',
            component:CorporateUserProfileComponent
          },
          {
            path:'reports',
            component:CorporateCompanyReportsComponent
          }
        ]
			}
		]
	},
	{
		path:'travel-company',
    component:TravelCompanyComponent,
		children:[
			{
				path:'login',
				component:TravelCompanyLoginComponent
			},
      {
        path:'forgot-password',
        component:TravelCompanyForgotPasswordComponent
      },
      {
        path:'registration',
        component:TravelCompanyRegistrationComponent
      },
      {
				path:'dashboard',
				component:TravelCompanyDashboardComponent,
        canActivate : [TravelCompanyGuard],
        children:[
          {
            path:'home',
            component:TravelCompanyHomeComponent
          },
          {
            path:'users',
            component:TravelCompanyUsersComponent
          },
          {
            path:'team-members',
            component:TravelCompanyTeamMembersComponent
          },
          {
            path:'agency-profile',
            component:TravelCompanyProfileComponent
          },
          {
            path:'settings',
            component:TravelCompanySettingComponent
          },
          {
            path:'mapping',
            component:TravelCompanyMappingComponent
          },
          {
            path:'request-details/:RequestId',
            component:TravelCompanyRequestDetailsComponent
          },          
          {
            path:'my-requests',
            component:TravelCompanyMyRequestsComponent
          },
          {
            path:'all-requests',
            component:TravelCompanyAllRequestsComponent
          },
          {
            path:'user-profile',
            component:TravelUserProfileComponent
          },
          {
            path:'reports',
            component:TravelCompanyReportsComponent
          }
        ]
			}
		]
	},

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
