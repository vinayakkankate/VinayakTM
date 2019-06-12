import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { SpinnerService } from '../../../services/spinner.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-corporate-company-login',
  templateUrl: './corporate-company-login.component.html',
  styleUrls: ['./corporate-company-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyLoginComponent implements OnInit {

  loginForm : FormGroup;
  userData:any;
  companyData:any;
  errmsg:string;
  constructor(
    private spinnerService : SpinnerService,
    private fb : FormBuilder,
    private authService : AuthService,
    private apisService : ApisService,
    public toastService:ToastService,
    private router : Router){
    this.loginForm = fb.group({
        'email' : [null, Validators.required],
        'password': [null, Validators.required],
      });
    }

    submitForm(value: any){
      this.spinnerService.displaySpinner(true);
      const user = {
        'Email' : value.email,
        'Password' : value.password
      }

      this.apisService.corporateCompanyUserLogin(user)
        .subscribe(data => {
          console.log("corporateCompanyUserLogin :", data);
          debugger;
        if(data.success){
          this.authService.setUserToken(data.data.Token);
          delete data.data.Token;
          data.data.Type="CC";
          this.authService.setUserData(data.data);
          
          if(data.data.Role==1){
            var companyId:any={
              CompanyId:data.data.CompanyId._id
            }
            this.apisService.getUpdatedCompanyData(companyId)
              .subscribe(res => {this.companyData=res.data;
                this.authService.setCompanyData(this.companyData);    
                if(this.authService.getUserData().CompanyId.hasOwnProperty("profileSaveFlag") == true && this.authService.getUserData().CompanyId.profileSaveFlag == true){ 
                    console.log(this.authService.getUserData().CompanyId.profileSaveFlag); 
                    this.router.navigate(['corporate-company/dashboard/home']);
                }else{
                    console.log("in else part");
                    this.router.navigate(['corporate-company/dashboard/company-profile']);
                }          
            });
          }else{
            this.router.navigate(['corporate-company/dashboard/home']);
          }  
          
             //this.router.navigate(['corporate-company/dashboard/company-profile']);

          this.spinnerService.displaySpinner(false);
          this.toastService.showSuccess(data.message);
        }else{
            
            this.errmsg=data.message;
            this.toastService.showError(data.message);
            this.spinnerService.displaySpinner(false);
          }
        });
      }

  ngOnInit() {
    this.userData = this.authService.getUserData();
    if(this.userData){
      this.router.navigate(['corporate-company/dashboard/home']);
    }
  }
}
