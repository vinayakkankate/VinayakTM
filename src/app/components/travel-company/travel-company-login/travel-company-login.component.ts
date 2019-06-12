import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-travel-company-login',
  templateUrl: './travel-company-login.component.html',
  styleUrls: ['./travel-company-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyLoginComponent implements OnInit {
loginForm : FormGroup;
  userData:any;
  errmsg:string;
companyData:any;
  constructor(
    private fb : FormBuilder,
    private spinnerService : SpinnerService,
    private authService : AuthService,
    private apisService : ApisService,
    public toastService:ToastService,
    private router : Router){
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

      this.apisService.travelCompanyUserLogin(user)
          .subscribe(data => {
          if(data.success){
            this.scrollWin();
            this.authService.setUserToken(data.data.Token);
            delete data.data.Token;
            data.data.Type="TC";
            this.authService.setUserData(data.data);
            this.spinnerService.displaySpinner(false);
              if(data.data.Role==1)
              {
                var agencyId={AgencyId:data.data.AgencyId._id}
                this.apisService.getUpdatedTravelAgencyData(agencyId)
          .subscribe(res => {this.companyData=res.data;
            this.authService.setCompanyData(this.companyData);
              });
              }
            this.router.navigate(['travel-company/dashboard/home']);
            this.toastService.showSuccess(data.message);

          }else{
            this.errmsg=data.msg;
            this.router.navigate(['travel-company/login']);
            this.toastService.showError(data.message);
            this.spinnerService.displaySpinner(false);
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
