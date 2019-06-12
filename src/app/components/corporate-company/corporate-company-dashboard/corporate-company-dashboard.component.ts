import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { Router,RoutesRecognized } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { SpinnerService } from '../../../services/spinner.service';


@Component({
  selector: 'app-corporate-company-dashboard',
  templateUrl: './corporate-company-dashboard.component.html',
  styleUrls: ['./corporate-company-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyDashboardComponent implements OnInit {

userData:any;
teamLeader:boolean;
employee:boolean;
admin:boolean
requestDetailsURL:any;
previousURL:any;
consoleTab:boolean;
// flightImage: string = "assets/images/flight.png";




  constructor(private router:Router,
  public authService:AuthService,
  private spinnerService : SpinnerService,
  private apisService:ApisService,
  public toastService:ToastService) {  
    console.log("in constructor");
    this.consoleTab=false;
    
  }



  ngOnInit() {
   
    this.consoleTab=false;
    this.requestDetailsURL=this.router.url.split('/');
  
    this.userData = this.authService.getUserData();
    //console.log('userdata',this.userData);
    if(this.userData.Type!=="CC"){
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
  oncorporateDashboardHome(item){
      this.router.navigate(['/corporate-company/dashboard/home'])
  }

  takeURLname():any{
    this.router.events
    .filter((e: any) => e instanceof RoutesRecognized)
    .pairwise()
    .subscribe((e: any) => {
      //console.log(e);
       this.previousURL=e[0].url.split('/');
       this.previousURL=this.previousURL[3]
      // console.log("this.previousURL",this.previousURL);
    });
   
    if(this.previousURL =="team-requests"){
       this.requestDetailsURL=this.router.url.split('/');
       this.requestDetailsURL[3]="T"+this.requestDetailsURL[3];
    }
    else {
      this.requestDetailsURL=this.router.url.split('/');
      this.requestDetailsURL[3]="M"+this.requestDetailsURL[3];
    }
    //console.log(this.requestDetailsURL[3]);
    return this.requestDetailsURL[3];
  }

}
