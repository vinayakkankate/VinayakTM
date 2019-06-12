import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RequestStatusTextPipe } from '../../../../pipes/request-status-text.pipe';
import { RequestStatusTextClassPipe } from '../../../../pipes/request-status-text-class.pipe';
import { RequestStatusIconClassPipe } from '../../../../pipes/request-status-icon-class.pipe';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';

declare var jQuery: any;
@Component({
  selector: 'app-corporate-company-team-requests',
  templateUrl: './corporate-company-team-requests.component.html',
  styleUrls: ['./corporate-company-team-requests.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyTeamRequestsComponent implements OnInit {

  DefaultPhotoPath: string = 'assets/images/icon/default-user.png';
  requestList: any = [];
  requestList1: any = [];
  teamMembers:any=[];
  loggedInUserData: any;
  statusFlag: any = null;
  p: number = 1;
  pageNumber: number = 0;
  count: number;
  showSubTab:any;

  constructor(
    public apisService: ApisService,
    private router: Router,
    public authServie: AuthService,
    public toastService: ToastService,
    public tokenService: TokenService,
    private spinnerService: SpinnerService
  ) {
    this.loggedInUserData = authServie.getUserData();
     this.getRequestsByReportingManagerId(this.loggedInUserData._id,null);
     this.getTeamMembers();
     this.showSubTab="All";

    /* this.requestList = {
      load: function (loadOptions: any) {
        var userData = authServie.getUserData();
        var params = {};
        var status = ['Pending', 'In-Progress', 'Confirmed', 'Processed', 'History'];
        var Request = ['CarRequest', 'FlightRequest', 'AccomodationRequest', 'TransferRequest'];
        params = { skip: loadOptions.skip || 0, take: loadOptions.take || 10, ReportingManagerId: userData._id }

        //Getting filter options

        if (loadOptions.filter) {
          // console.log(Array.isArray(loadOptions.filter[0]));
          if (Array.isArray(loadOptions.filter[0])) {
            jQuery.each(loadOptions.filter, function (key, value) {
              console.log(value);
              if (value.length == 3) {
                // 
                if (value[0] == 'CompanyRequestId')
                  params['CompanyRequestId'] = value[2];

                  // Company Name
                else if (value[0] == 'AgencyId.CompanyName')
                  params['AgencyName'] = value[2];

                // Request for
                else if (value[0] == '_id'){
                  var i = 0;
                  let requestMatch = false;
                  for (i = 0; i < Request.length; i++) {
                    var res = Request[i].substring(0, 2).toLowerCase();
                    var res1 = value[2].substring(0, 2).toLowerCase();
                    if (res.match(res1)) {
                      params['RequestType'] = Request[i];
                      requestMatch = true;
                      
                    }
                  }
                  if (requestMatch === false) {
                    params['RequestType'] = value[2];
                  }
                }
                  // params['Requests'] = value[2];

                  // Requester
                else if (value[0] == 'CompanyUserId.FirstName')
                  params['EmployeeName'] = value[2];


                else if (value[0] == 'createdAt')
                 {
                  var i = 0;
                  let isMatch = false;
                  for (i = 0; i < status.length; i++) {
                    var res = status[i].substring(0, 2).toLowerCase();
                    var res1 = value[2].substring(0, 2).toLowerCase();
                    if (res.match(res1)) {
                      params['Status'] = status[i];
                      isMatch = true;
                    }
                  }
                  if (isMatch === false) {
                    params['Status'] = value[2];
                  }
                 }
              }
            });
          }
          else {
            console.log(loadOptions.filter[0]);
            if (loadOptions.filter[0] == 'CompanyRequestId')
              params['CompanyRequestId'] = loadOptions.filter[2];

              // AgencyName
              if (loadOptions.filter[0] == 'AgencyId.CompanyName')
              params['AgencyName'] = loadOptions.filter[2];

              // Request
            if (loadOptions.filter[0] == '_id'){
              var i = 0;
              let requestMatch = false;
              var result;
              for (i = 0; i < Request.length; i++) {
                var res = Request[i].substring(0, 2).toLowerCase();
                var res1 = loadOptions.filter[2].substring(0, 2).toLowerCase();
                if (res.match(res1)) {
                  params['RequestType'] = Request[i];
                  requestMatch = true;
                  
                }
              }
              if (requestMatch === false) {
                params['RequestType'] = loadOptions.filter[2];
              }
            }
              // params['Requests'] = loadOptions.filter[2];

            if (loadOptions.filter[0] == 'CompanyUserId.FirstName')
              params['EmployeeName'] = loadOptions.filter[2];

            if (loadOptions.filter[0] == 'createdAt')
              {
                var i = 0;
                let isMatch = false;
                for (i = 0; i < status.length; i++) {
                  var res = status[i].substring(0, 2).toLowerCase();
                  var res1 = loadOptions.filter[2].substring(0, 2).toLowerCase();
                  if (res.match(res1)) {
                    params['Status'] = status[i];
                    isMatch = true;
                  }
                }
                if (isMatch === false) {
                  params['Status'] = loadOptions.filter[2];
                }
              }
          }
        }

        console.log(params);
        return apisService.getRequestsByReportingManagerId(params)
          .then(res => {
            console.log("getRequestsByReportingManagerId : ", res);
            debugger;
            if (res.success) {
              if (res.data.length > 0) {
                console.log(res);
                //toastService.showSuccess(res.message);
                return {
                  data: res.data,
                  totalCount: (res.data.length > 0 ? res.count : 0)
                }
              }
              else {
                //toastService.showWarning(res.message);
                return {
                  data: [],
                  totalCount: 0
                }
              }
            }
            else {
              // return {
              //   data: [],
              //   totalCount: 0
              // }
              tokenService.tokenExpired(res.message);   //SS changes
            }
          },
          (err) => {
            return {
              data: [],
              totalCount: 0
            }
          });
      }
    }

    console.log(this.requestList)
    this.requestList1=this.requestList; */

  }

  sortRequestStatusWise(status: any) {
    if (this.statusFlag != status) {
      this.pageNumber = 0;
      this.requestList = []
    }
    this.statusFlag = status;
    this.nextRecords()
  }

  nextRecords() {
    //this.getRequestsByReportingManagerId(this.loggedInUserData._id, this.statusFlag)
  }

  getRequestsByReportingManagerId(ReportingManagerId, Status) {
   // var sendData = { pageNumber: this.pageNumber, ReportingManagerId: ReportingManagerId, Status: Status };
    //this.apisService.getRequestsByReportingManagerId(sendData)
    let params={ReportingManagerId: ReportingManagerId, Status: Status};
    this.apisService.getRequestsByReportingManagerId(params)
          .then(res => {
            console.log("getRequestsByReportingManagerId : ", res);
            debugger;
            if (res.success) {
              if (res.data.length > 0) {
                this.requestList=res.data;  
                this.requestList1 = this.requestList.filter(function (item) {
                    return (item.Status==5 || item.Status==1);
                }); 
              }
              else {
                this.requestList=[];  
                this.requestList1=[];  
              }
            }
          },
          (err) => {
            this.toastService.showSuccess(err);
          });




    /* .subscribe(res => {
        if(res.success){
          if(res.data){
            this.pageNumber++;
            console.log(res.count);
            this.count=res.count;
            this.requestList=this.requestList.concat(res.data);            
            this.spinnerService.displaySpinner(false);      
            console.log(this.requestList.length);    
          }else{
            this.requestList=res.data;
            this.spinnerService.displaySpinner(false);
            this.toastService.showSuccess(res.message);
          }    
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
    }); */
  }

  changeClass() {
    return 'request-status-text approved';
  }

  ngOnInit() {
    //this.getRequestsByReportingManagerId(this.loggedInUserData._id,null);
    this.showSubTab="All";
  }

filterRequest(status){
    if(status =='All'){
      this.showSubTab="All";
      //this.requestList1=this.requestList;
      return;
    }else if(status =='Pending'){
      this.showSubTab="Pending";
      /* this.requestList1 = this.requestList.filter(function (item) {
          return (item.Status==5 || item.Status==1);
      });  */
      return;
    }else if(status =='members'){
      this.showSubTab="members";
    }
}

getTeamMembers(){
  var companyId:any={
      CompanyId:this.loggedInUserData.CompanyId._id,
      ReportingManagerId:this.loggedInUserData._id
  }
  console.log(companyId);
  this.spinnerService.displaySpinner(true);
  this.apisService.getTeamMembers(companyId).subscribe(res => {
      if(res.success){
          if(res.data){
              this.teamMembers=res.data
              console.log(this.teamMembers);
              this.spinnerService.displaySpinner(false);   
          }else{
              this.spinnerService.displaySpinner(false);   
              this.toastService.showInfo(res.message);
          }
      }else{
          this.spinnerService.displaySpinner(false);   
          this.toastService.showInfo(res.message);
      }            
  });
}

}
