import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';


@Component({
  selector: 'app-tm-admin-login',
  templateUrl: './tm-admin-login.component.html',
  styleUrls: ['./tm-admin-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TmAdminLoginComponent implements OnInit {

  loginForm : FormGroup;
  userData:any;
  errmsg:string;
authenticated:boolean;
  constructor(
    public fb : FormBuilder,
    private spinnerService : SpinnerService,
    public authService : AuthService,
    public apisService : ApisService,
    public toastService:ToastService,
    public router : Router){
this.authenticated=false;
    this.loginForm = fb.group({
        'email' : [null, Validators.required],
        'password': [null, Validators.required],
      });
    }

    scrollWin() {
    window.scrollTo(0, 0);
}

    submitForm(value: any){
      this.spinnerService.displaySpinner(true);
      const user = {
        'Email' : value.email,
        'Password' : value.password
      }
      this.apisService.tmAdminLogin(user)
          .subscribe(data => {
          if(data.success){
            this.scrollWin();
            this.authService.setUserToken(data.data.Token);
            this.authenticated=false;
            delete data.data.Token;
            data.data.Type="TM";
            this.authService.setUserData(data.data);
            this.router.navigate(['tm-admin/dashboard/home']);
            this.toastService.showSuccess(data.message);
            this.spinnerService.displaySpinner(false);
          }else{
            this.authenticated=true;

            this.errmsg=data.message;
              this.router.navigate(['tm-admin/login']);
              this.toastService.showError(data.message);
              this.spinnerService.displaySpinner(false);
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
