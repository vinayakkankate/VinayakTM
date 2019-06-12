import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import {RatingModule} from "ng2-rating";
import { trigger, state, style, transition, animate } from '@angular/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CorporateCompanyComponent } from './components/corporate-company/corporate-company.component';
import { TravelCompanyComponent } from './components/travel-company/travel-company.component';
import { TmAdminComponent } from './components/tm-admin/tm-admin.component';
import { CorporateCompanyLoginComponent } from './components/corporate-company/corporate-company-login/corporate-company-login.component';
import { CorporateUpdateUserComponent } from './components/corporate-company/corporate-update-user/corporate-update-user.component';
import { TmAdminLoginComponent } from './components/tm-admin/tm-admin-login/tm-admin-login.component';
import { AboutusComponent } from './components/landing-page/aboutus/aboutus.component';
import { ContactusComponent } from './components/landing-page/contactus/contactus.component';
import { CorporateCompanyDashboardComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-dashboard.component';
import { TravelCompanyLoginComponent } from './components/travel-company/travel-company-login/travel-company-login.component';
import { TmAdminDashboardComponent } from './components/tm-admin/tm-admin-dashboard/tm-admin-dashboard.component';
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
import { AuthService } from './services/auth.service';
import { ApisService} from './services/apis.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { TmAdminGuard } from './guards/tm-admin.guard';
import { CorporateCompanyGuard } from './guards/corporate-company.guard';
import { TravelCompanyGuard } from './guards/travel-company.guard';
import { TravelCompanyDashboardComponent } from './components/travel-company/travel-company-dashboard/travel-company-dashboard.component';
import { CorporateCompanyUserComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-user/corporate-company-user.component';
import { CorporateCompanyProfileComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-profile/corporate-company-profile.component';
import { CorporateCompanyRegistrationComponent } from './components/corporate-company/corporate-company-registration/corporate-company-registration.component';
import { TravelCompanyRegistrationComponent } from './components/travel-company/travel-company-registration/travel-company-registration.component';
import { TravelCompanyHomeComponent } from './components/travel-company/travel-company-dashboard/travel-company-home/travel-company-home.component';
import { Ng2CompleterModule } from "ng2-completer";
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { DatePipe } from '@angular/common';
import { DxDataGridModule,DxTemplateModule,DxLookupModule,DxFileUploaderModule,DxPopupModule,DxFormModule, DxDateBoxModule,DxSelectBoxModule,DxButtonModule,DxTextBoxModule} from 'devextreme-angular';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { RequestStatusTextPipe } from './pipes/request-status-text.pipe';
import { RequestStatusTextClassPipe } from './pipes/request-status-text-class.pipe';
import { RequestStatusIconClassPipe } from './pipes/request-status-icon-class.pipe';
import { TripTypePipe } from './pipes/trip-type.pipe';
import { FlightTypePipe } from './pipes/flight-type.pipe';
import { FlightClassPipe } from './pipes/flight-class.pipe';
import { CarsPipe } from './pipes/cars.pipe';
import { TransportationsPipe } from './pipes/transporations.pipe';

import { CorporateCompanyRequestDetailsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-request-details/corporate-company-request-details.component';
import { TravelCompanyUsersComponent } from './components/travel-company/travel-company-dashboard/travel-company-users/travel-company-users.component';
import { TravelCompanyProfileComponent } from './components/travel-company/travel-company-dashboard/travel-company-profile/travel-company-profile.component';
import { TravelCompanySettingComponent } from './components/travel-company/travel-company-dashboard/travel-company-setting/travel-company-setting.component';
import { CorporateCompanyMappingComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-mapping/corporate-company-mapping.component';
import { MappingStatusPipe } from './pipes/mapping-status.pipe';
import { TravelCompanyMappingComponent } from './components/travel-company/travel-company-dashboard/travel-company-mapping/travel-company-mapping.component';
import { TravelCompanyMyRequestsComponent } from './components/travel-company/travel-company-dashboard/travel-company-my-requests/travel-company-my-requests.component';
import { TravelCompanyRequestDetailsComponent } from './components/travel-company/travel-company-dashboard/travel-company-request-details/travel-company-request-details.component';
import { AirportSearchPipe } from './pipes/airport-search.pipe';
import { CorporateUserProfileComponent } from './components/corporate-company/corporate-company-dashboard/corporate-user-profile/corporate-user-profile.component';
import { TravelUserProfileComponent } from './components/travel-company/travel-company-dashboard/travel-user-profile/travel-user-profile.component';
import { MinutesRoundPipe } from './pipes/minutes-round.pipe';
import { TravelCompanyForgotPasswordComponent } from './components/travel-company/travel-company-forgot-password/travel-company-forgot-password.component';
import { CorporateCompanyForgotPasswordComponent } from './components/corporate-company/corporate-company-forgot-password/corporate-company-forgot-password.component';
import { TmAdminForgotPasswordComponent } from './components/tm-admin/tm-admin-forgot-password/tm-admin-forgot-password.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AgencyDetailsDialogComponent } from './dialog/agency-details-dialog/agency-details-dialog.component';
import { CompanyDetailsDialogComponent } from './dialog/company-details-dialog/company-details-dialog.component';
import { ToastModule,ToastOptions } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastCustomOption } from './config/toast-custom-option';
import { ToastService } from './services/toast.service';
import { SpinnerService } from './services/spinner.service';
import { TravelCompanyTeamMembersComponent } from './components/travel-company/travel-company-dashboard/travel-company-team-members/travel-company-team-members.component';
import { CorporateCompanyAllRequestsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-all-requests/corporate-company-all-requests.component';
import { TravelCompanyAllRequestsComponent } from './components/travel-company/travel-company-dashboard/travel-company-all-requests/travel-company-all-requests.component';
import { RatingComponent } from './rating/rating.component';
import { RequestBookingDialogComponent } from './dialog/request-booking-dialog/request-booking-dialog.component';
import { AddressSplitPipe } from './pipes/address-split.pipe';
import { ViewfilePipe } from './pipes/view-file.pipe';
import { TokenService } from './services/token.service';
import { CorporateCompanyReportsComponent } from './components/corporate-company/corporate-company-dashboard/corporate-company-reports/corporate-company-reports.component';
import { TravelCompanyReportsComponent } from './components/travel-company/travel-company-dashboard/travel-company-reports/travel-company-reports.component';
// import { FileUploader } from 'ng2-file-upload';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CorporateCompanyComponent,
    TravelCompanyComponent,
    TmAdminComponent,
    CorporateCompanyLoginComponent,
    CorporateUpdateUserComponent,
    TmAdminLoginComponent,
    AboutusComponent,
    ContactusComponent,
    CorporateCompanyDashboardComponent,
    TravelCompanyLoginComponent,
    TmAdminDashboardComponent,
    TmAdminHomeComponent,
    TmAdminProfileComponent,
    TmAdminSettingsComponent,
    TmAdminCompaniesComponent,
    TmAdminUsersComponent,
    CorporateCompanyHomeComponent,
    CorporateCompanyNewRequestComponent,
    CorporateCompanyMyRequestsComponent,
    CorporateCompanyTeamRequestsComponent,
    CorporateCompanyTeamMembersComponent,
    CorporateCompanySettingsComponent,
    TravelCompanyDashboardComponent,
    CorporateCompanyUserComponent,
    CorporateCompanyProfileComponent,
    CorporateCompanyRegistrationComponent,
    TravelCompanyRegistrationComponent,
    TravelCompanyHomeComponent,
    TmAdminCompaniesComponent,
    RequestStatusTextPipe,
    RequestStatusTextClassPipe,
    RequestStatusIconClassPipe,
    CorporateCompanyRequestDetailsComponent,
    TripTypePipe,
    FlightClassPipe,
    FlightTypePipe,
    TransportationsPipe,
    CarsPipe,
    TravelCompanyUsersComponent,
    TravelCompanyProfileComponent,
    TravelCompanySettingComponent,
    CorporateCompanyMappingComponent,
    MappingStatusPipe,
    TravelCompanyMappingComponent,
    TravelCompanyMyRequestsComponent,
    TravelCompanyRequestDetailsComponent,
    AirportSearchPipe,
    CorporateUserProfileComponent,
    TravelUserProfileComponent,
    MinutesRoundPipe,
    TravelCompanyForgotPasswordComponent,
    CorporateCompanyForgotPasswordComponent,
    TmAdminForgotPasswordComponent,
    AgencyDetailsDialogComponent,
    CompanyDetailsDialogComponent,
    TravelCompanyTeamMembersComponent,
    CorporateCompanyAllRequestsComponent,
    TravelCompanyAllRequestsComponent,
    RatingComponent,
    RequestBookingDialogComponent,
    AddressSplitPipe,
    ViewfilePipe,
    CorporateCompanyReportsComponent,
    TravelCompanyReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    FileUploadModule,
    Ng2CompleterModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxLookupModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxPopupModule,
    DxFormModule,
    DxDateBoxModule,
    GooglePlaceModule,
    DateTimePickerModule,
    BootstrapModalModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastModule.forRoot()    
  ],
  entryComponents:[
      AgencyDetailsDialogComponent,
      CompanyDetailsDialogComponent,
      RequestBookingDialogComponent
  ],
  providers: [
      ToastService,
      AuthService,
      ApisService,
      SpinnerService,
      TmAdminGuard,
      CorporateCompanyGuard,
      TravelCompanyGuard,
      DatePipe,
      TokenService,
      {provide:ToastOptions, useClass: ToastCustomOption}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
