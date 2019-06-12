import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-corporate-company-registration',
  templateUrl: './corporate-company-registration.component.html',
  styleUrls: ['./corporate-company-registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyRegistrationComponent implements OnInit {
userData:any;
authenticated : boolean=false;
  registerForm : FormGroup;
  constructor(public fb:FormBuilder,
    private spinnerService : SpinnerService,
    private authService : AuthService,
    private apisService : ApisService,
    public toastService:ToastService,
    private router : Router){
      this.registerForm = fb.group({
      'FirstName' : [null, Validators.required],
      'LastName' : [null, Validators.required],
      'CompanyName' : [null, Validators.required],
      'ContactNumber' : [null, Validators.required],
      'Email': [null, Validators.required],
      'Website':[null,Validators.required],
    })
    }

    userRegister(value:any){
      this.spinnerService.displaySpinner(true);
      this.userData={
        FirstName:value.FirstName,
        LastName:value.LastName,
        CompanyName:value.CompanyName,
        ContactNumber:value.ContactNumber,
        Email:value.Email,
        Website:value.Website,
        CompanyType:1,
        profileSaveFlag:false
      }

      this.apisService.registerCompany(this.userData)
          .subscribe(data => {
             this.scrollWin();
          if(data.success){
            this.router.navigate(['corporate-company/login']);
            this.spinnerService.displaySpinner(false);
            this.toastService.showSuccess(data.message);
          }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showError(data.message);
          }
        });
      }
      scrollWin() {
    window.scrollTo(0, 0);
}


  ngOnInit() {
    this.userData = this.authService.getUserData();
    if(this.userData){
      this.router.navigate(['corporate-company/dashboard/home']);
    }
  }

}
