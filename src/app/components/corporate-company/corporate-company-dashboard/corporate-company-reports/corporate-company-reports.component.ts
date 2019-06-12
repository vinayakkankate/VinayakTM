import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';


@Component({
  selector: 'app-corporate-company-reports',
  templateUrl: './corporate-company-reports.component.html',
  styleUrls: ['./corporate-company-reports.component.css']
})
export class CorporateCompanyReportsComponent implements OnInit {

  StartDate:any;
  EndDate:any;
  userData:any;
  expenceReport:any;
  outOfficeReport:any;
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
    this.reportName="expense";
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

  getExpenceReport(){

    var expenceReportDates = {
      "CompanyUserId": this.userData._id,
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "reports":this.showSubTab
    }
    this.apisService.reportsForExpenses(expenceReportDates)
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
  getOutOfOfficeReport(){

    var outOfOfficeReportDates = {
      "CompanyUserId": this.userData._id,
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "reports":this.showSubTab
    }
    this.apisService.reportsForOutOfOffice(outOfOfficeReportDates)
    .subscribe(res => {
      console.log("responce of out of office report :",res);
      if (res.success) {
        for(let i=0;i<res.data.length;i++){
          let tempobj={};
          tempobj["firstdate"]=new Date(res.data[i].FirstDate).getDate();
          tempobj["lastdate"]=new Date(res.data[i].LastDate).getDate();
          tempobj["month"]=new Date(res.data[i].FirstDate).getMonth();
          res.data[i].dateObj=tempobj;
        }
        this.outOfficeReport = res.data;
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
