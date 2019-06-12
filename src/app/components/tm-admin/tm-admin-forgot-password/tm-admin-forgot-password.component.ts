import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-tm-admin-forgot-password',
  templateUrl: './tm-admin-forgot-password.component.html',
  styleUrls: ['./tm-admin-forgot-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TmAdminForgotPasswordComponent implements OnInit {

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
      this.spinnerService.displaySpinner(true);
      const user = {
        'Email' : value.email,
      }

      this.apisService.tmUserForgotPassword(user)
          .subscribe(data => {
          if(data.success){
            	this.router.navigate(['tm-admin/login']);
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
	      this.router.navigate(['tm-admin/dashboard/home']);
	    }
  	}
}
