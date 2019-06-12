import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-travel-company-setting',
  templateUrl: './travel-company-setting.component.html',
  styleUrls: ['./travel-company-setting.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanySettingComponent implements OnInit {
  OldPassword : string;
  NewPassword : string;
  ConfirmNewPassword : string;
  userData : any;
  mismatchedPasswords:boolean;
  newUserData:any={};

    constructor(
      private spinnerService : SpinnerService,
      public authService : AuthService,
      public apisService : ApisService,
      public toastService:ToastService,
      public router : Router){
      }

      

    changePassword(){
      this.spinnerService.displaySpinner(true);
      this.newUserData.OldPassword=this.OldPassword;
      this.newUserData.NewPassword=this.NewPassword;
      this.newUserData.AgencyUserId=this.userData._id;
      this.apisService.changeTravelCompanyUserPassword(this.newUserData)
        .subscribe(data => {
          if(data.success){
            this.toastService.showSuccess(data.message);
            this.router.navigate(['travel-company/dashboard/home']);
            this.spinnerService.displaySpinner(false);
          }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showError(data.message);
          }
        });      
    }
  ngOnInit() {
    this.userData=this.authService.getUserData();
  }

}
