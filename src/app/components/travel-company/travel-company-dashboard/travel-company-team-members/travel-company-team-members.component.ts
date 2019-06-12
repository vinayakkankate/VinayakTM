import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';


@Component({
  selector: 'app-travel-company-team-members',
  templateUrl: './travel-company-team-members.component.html',
  styleUrls: ['./travel-company-team-members.component.css']
})
export class TravelCompanyTeamMembersComponent implements OnInit {

  userData:any;
  userList:any;

  FirstName:string;
  LastName:string;
  Email:string;

  constructor(
  public apisService:ApisService,
  private authService:AuthService,
  private spinnerService : SpinnerService,
  private toastService : ToastService) {
    this.userData = this.authService.getUserData();
    this.getAgencyTeamMembers();
  }


  submitForm(){
    this.spinnerService.displaySpinner(true);
   let form = {
      'FirstName' : this.FirstName,
      'LastName' : this.LastName,
      'Email' : this.Email,
      'Role' : 3,
      'ReportingManagerId' : this.userData._id,
      'AgencyId':this.userData.AgencyId
    }

    this.apisService.addAgencyMember(form)
      .subscribe(res => {
        if(res.success){
          this.getAgencyTeamMembers();
          this.spinnerService.displaySpinner(false);
          this.toastService.showSuccess(res.message);
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });
  }


  getAgencyTeamMembers(){
    let feed={
      'ReportingManagerId' : this.userData._id,
    }

    this.apisService.getAgencyTeamMembers(feed)
      .subscribe(res => {
        if(res.success){
          this.userList=res.data;
          this.spinnerService.displaySpinner(false);
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });
  }

  ngOnInit() {

  }
}
