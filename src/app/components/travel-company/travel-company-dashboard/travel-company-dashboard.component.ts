import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { ApisService } from '../../../services/apis.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-travel-company-dashboard',
  templateUrl: './travel-company-dashboard.component.html',
  styleUrls: ['./travel-company-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyDashboardComponent implements OnInit {
userData:any;

  constructor(private router:Router,
    private spinnerService : SpinnerService,
  private authService:AuthService,
  private apisService:ApisService,
  public toastService:ToastService) {

    }

  ngOnInit() {
    this.userData = this.authService.getUserData();
    console.log('userData', this.userData);
    if(this.userData.Type!=="TC"){
      this.router.navigate(['']);
      
    }
  }


  onLogoutClick(){
    this.spinnerService.displaySpinner(true);
  	this.authService.logoutUser();
    this.toastService.showSuccess('Logged Out Successfully');
  	this.router.navigate(['']);
    this.spinnerService.displaySpinner(false);
 	  return false;
  }

  ontravelDashboardHome(item){
      this.router.navigate(['/travel-company/dashboard/home'])
  }

}
