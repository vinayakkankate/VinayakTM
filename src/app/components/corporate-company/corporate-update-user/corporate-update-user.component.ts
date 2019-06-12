import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { SpinnerService } from '../../../services/spinner.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-corporate-update-user',
  templateUrl: './corporate-update-user.component.html',
  styleUrls: ['./corporate-update-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateUpdateUserComponent implements OnInit {

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
        'oldEmail' : [null, Validators.required],
        'newEmail': [null, Validators.required],
        'FirstName': [null, Validators.required],
        'LastName': [null, Validators.required]
      });
    }

  submitForm(value: any){
    this.spinnerService.displaySpinner(true);
    const user = {
      'OldEmail' : value.oldEmail,
      'NewEmail' : value.newEmail,
      'FirstName' : value.FirstName,
      'LastName' : value.LastName
    }
    this.apisService.leftUserUpdate(user)
    .subscribe(res=>{
      if(res.success){
        this.toastService.showSuccess(res.message);
        this.spinnerService.displaySpinner(false);
        this.router.navigate(['corporate-company/login']);
      }else{
        this.toastService.showSuccess(res.message);
        this.spinnerService.displaySpinner(false);
      }
    });
  }

      

  ngOnInit() {
    this.userData = this.authService.getUserData();
    // if(this.userData){
      // this.router.navigate(['corporate-company/dashboard/home']);
    // }
  }
}
