import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-tm-admin-dashboard',
  templateUrl: './tm-admin-dashboard.component.html',
  styleUrls: ['./tm-admin-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TmAdminDashboardComponent implements OnInit {

  userData:any;
  constructor(
    private spinnerService : SpinnerService,
  	private authService:AuthService,
  	private router:Router,
  	public toastService:ToastService

  	) { }

  ngOnInit() {
this.userData = this.authService.getUserData();
  }


  onLogoutClick(){
    this.spinnerService.displaySpinner(true);
  	this.authService.logoutUser();
    this.toastService.showSuccess('Logged Out Successfully');
  	this.router.navigate(['']);
    this.spinnerService.displaySpinner(false);
 	  return false; 	
  }
}
