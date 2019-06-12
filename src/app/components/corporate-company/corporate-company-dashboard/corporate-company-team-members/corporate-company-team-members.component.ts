import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-corporate-company-team-members',
  templateUrl: './corporate-company-team-members.component.html',
  styleUrls: ['./corporate-company-team-members.component.css']
})
export class CorporateCompanyTeamMembersComponent implements OnInit {

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
    this.getCompanyTeamMembers();
  }


  submitForm(){
    this.spinnerService.displaySpinner(true);
   let form = {
      'FirstName' : this.FirstName,
      'LastName' : this.LastName,
      'Email' : this.Email,
      'Role' : 3,
      'ReportingManagerId' : this.userData._id,
      'CompanyId':this.userData.CompanyId
    }

    this.apisService.addCompanyMember(form)
      .subscribe(res => {
        if(res.success){
          this.getCompanyTeamMembers();
          this.spinnerService.displaySpinner(false);
          this.toastService.showSuccess(res.message);
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });
  }


  getCompanyTeamMembers(){
    let feed={
      'ReportingManagerId' : this.userData._id,
    }

    this.apisService.getCompanyTeamMembers(feed)
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
