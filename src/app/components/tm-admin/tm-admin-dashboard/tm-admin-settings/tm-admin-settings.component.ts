import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-tm-admin-settings',
  templateUrl: './tm-admin-settings.component.html',
  styleUrls: ['./tm-admin-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TmAdminSettingsComponent implements OnInit {

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
      this.newUserData.TMUserId=this.userData._id;
      this.apisService.changeTravelMediaryUserPassword(this.newUserData)
        .subscribe(data => {
          if(data.success){
            this.toastService.showSuccess(data.message);
            this.router.navigate(['tm-admin/dashboard/home']);
            this.spinnerService.displaySpinner(false);
          }else{
            this.toastService.showError(data.message);
            this.spinnerService.displaySpinner(false);
          }
        });      
    }
  ngOnInit() {
    this.userData=this.authService.getUserData();
  }

}
