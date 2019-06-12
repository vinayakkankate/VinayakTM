import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';


@Component({
  selector: 'app-travel-company-reports',
  templateUrl: './travel-company-reports.component.html',
  styleUrls: ['./travel-company-reports.component.css']
})
export class TravelCompanyReportsComponent implements OnInit {

  StartDate:any;
  EndDate:any;
  userData:any;
  expenceReport:any;
  dates:any=[1,2,3,4,5,6,7,8,9,10];
  showSubTab:any;
  reportName:any;

  constructor(    private spinnerService: SpinnerService,
    public apisService: ApisService,
    public authServie: AuthService,
    public tokenService: TokenService,
    public toastService: ToastService,) { }

  ngOnInit() {
    this.userData = this.authServie.getUserData();
    this.showSubTab="Myreports";
    this.reportName="Transaction";
  }

  onstartDateChange(item){
    debugger;
    if (this.EndDate) {
      if (new Date(this.StartDate) > new Date(this.EndDate)) {
        this.StartDate = '';
        this.toastService.showError("Start date is greater than end date");
      } else{
        this.StartDate = item;
      }
    }else{
      this.StartDate = item;
    }
    console.log("start date :", this.StartDate);
  }
  onendDateChange(item) {
    debugger;
    if (this.StartDate) {
      if (new Date(this.StartDate) > new Date(this.EndDate)) {
        this.EndDate = '';
        this.toastService.showError("Start date is greater than end date");
      }else{
        this.EndDate = item;
      }
    }else{
      this.EndDate = item;
    }
    console.log("end date :", this.EndDate);
  }

  getReport(){

    var expenceReportDates = {
      "AgencyEmployeeId": this.userData._id,
      "startDate": this.StartDate,
      "endDate": this.EndDate
    }
    this.apisService.travelAgentReports(expenceReportDates)
    .subscribe(res => {
      console.log("responce of expence report :",res);
      if (res.success) {
        this.expenceReport = res.data;
        this.spinnerService.displaySpinner(false);       
      } else {
        this.spinnerService.displaySpinner(false);
        this.tokenService.tokenExpired(res.message);
      }
    },
    err => {
      this.toastService.showError("Please check your internet connection");
      this.spinnerService.displaySpinner(false);  
    });

  }


  showSubTabs(val){
    this.showSubTab=val;
  }

}
