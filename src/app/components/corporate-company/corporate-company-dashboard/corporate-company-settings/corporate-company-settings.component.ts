import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { Router} from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';


@Component({
  selector: 'app-corporate-company-settings',
  templateUrl: './corporate-company-settings.component.html',
  styleUrls: ['./corporate-company-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanySettingsComponent implements OnInit {

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
      this.newUserData.CompanyUserId=this.userData._id;
  		this.apisService.changeCorporateCompanyUserPassword(this.newUserData)
  			.subscribe(data => {
  				if(data.success){  					
            this.router.navigate(['corporate-company/dashboard/home']);
            this.spinnerService.displaySpinner(false);
            this.toastService.showSuccess(data.message);
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
