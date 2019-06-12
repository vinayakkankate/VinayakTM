import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-travel-company-forgot-password',
  templateUrl: './travel-company-forgot-password.component.html',
  styleUrls: ['./travel-company-forgot-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyForgotPasswordComponent implements OnInit {

  form : FormGroup;
  userData:any;
  errmsg:string;
  
  constructor(
    private fb : FormBuilder,
    private spinnerService : SpinnerService,
    private authService : AuthService,
    private apisService : ApisService,
    public toastService:ToastService,
    private router : Router){

    this.form = fb.group({
        'email' : [null, Validators.required],
      });
    }

    submitForm(value: any){
      this.spinnerService.displaySpinner(false);
      const user = {
        'Email' : value.email,
      }

      this.apisService.agencyUserForgotPassword(user)
          .subscribe(data => {
          if(data.success){
            	this.router.navigate(['travel-company/login']);
            	this.toastService.showSuccess(data.message);
              this.spinnerService.displaySpinner(false);
          }else{
            this.spinnerService.displaySpinner(false);
        	  this.toastService.showWarning(data.message);
          	}
        });
    }

  	ngOnInit() {
	    this.userData = this.authService.getUserData();
	    if(this.userData){
	      this.router.navigate(['travel-company/dashboard/home']);
	    }
  	}
}
