import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';
import { Observable } from 'rxjs/Observable';
import { RequestStatusTextPipe } from '../../../../pipes/request-status-text.pipe';
import { RequestStatusTextClassPipe } from '../../../../pipes/request-status-text-class.pipe';
import { RequestStatusIconClassPipe } from '../../../../pipes/request-status-icon-class.pipe';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';
import validator from 'devextreme/ui/validator';

declare var jQuery: any;
@Component({
  selector: 'app-corporate-company-my-requests',
  templateUrl: './corporate-company-my-requests.component.html',
  styleUrls: ['./corporate-company-my-requests.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyMyRequestsComponent implements OnInit {

  DefaultPhotoPath: string = '/assets/images/icon/default-user.png'; //http://placehold.it/270x270'; //'/assets/images/icon/man-user.png';
  requestList: any = [];
  loggedInUserData: any;
  statusFlag: any = null;

  public x: number = 5;
  public y: number = 2;
  public max: number = 5;
  public rate: number = 0;
  public isReadonly: boolean = false;
  RatingFeedback: any;
  RequestId: any;
  rated: boolean = false;

  public overStar: number;
  public percent: number;
  public reasonforHeaderFilter:any;

  public ratingStates: any = [
    { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
    { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
    { stateOn: 'glyphicon-heart' },
    { stateOff: 'glyphicon-off' }
  ];

  p: number = 1;
  pageNumber: number = 0;
  count: number;

  constructor(

    private spinnerService: SpinnerService,
    public apisService: ApisService,
    public authServie: AuthService,
    public tokenService: TokenService,
    public toastService: ToastService,
  ) {
    this.loggedInUserData = authServie.getUserData();

    
    this.reasonforHeaderFilter = [{
          text: "Accomodation",
          value:  ["Requests[0].AccomodationRequest.requestStr","Accomodation"]
        } ,{
          text: "Flight",
          value:["Requests[1].FlightRequest.requestStr","Flight"]
        } ,{
          text: "Car",
          value: ["Requests[2].CarRequest.requestStr","Car"]
        } ,{
          text: "Transfer",
          value: ["Requests[3].TransferRequest.requestStr","Transfer"]
      }];
    // this.getRequestsByCompanyUserId(this.loggedInUserData._id,null)


    // bind requestlist
    // this.requestList = {
    //   load: function (loadOptions: any) {
    //     console.log("loaderOption :", loadOptions)
    //     var userData = authServie.getUserData();
    //     var params = {};
    //     var status = ['Pending', 'In-Progress', 'Confirmed', 'Processed','History'];
    //     var Request =['CarRequest', 'FlightRequest', 'AccomodationRequest', 'TransferRequest'];
    //     params = { skip: loadOptions.skip || 0, take: loadOptions.take || 10, CompanyUserId: userData._id}

    //     //Getting filter options
    //     console.log(loadOptions);
    //     if (loadOptions.filter) {
          
    //       if (Array.isArray(loadOptions.filter[0])) {
    //         jQuery.each(loadOptions.filter, function (key, value) {
    //           if (value.length == 3) {
    //             // CompanyRequestId
    //             if (value[0] == 'CompanyRequestId')
    //               params['CompanyRequestId'] = value[2];

    //             // Company Name
    //             else if (value[0] == 'AgencyId.CompanyName')
    //               params['AgencyName'] = value[2];

    //             // Request for
    //             else if (value[0] == '_id'){
    //               var i = 0;
    //               let requestMatch = false;
    //               for (i = 0; i < Request.length; i++) {
    //                 var res = Request[i].substring(0, 2).toLowerCase();
    //                 var res1 = value[2].substring(0, 2).toLowerCase();
    //                 if (res.match(res1)) {
    //                   params['RequestType'] = Request[i];
    //                   requestMatch = true;
                      
    //                 }
    //               }
    //               if (requestMatch === false) {
    //                 params['RequestType'] = value[2];
    //               }
    //             }
    //               // params['RequestType'] = value[2];

    //             // Approver
    //             else if (value[0] == 'ReportingManagerId.FirstName')
    //               params['ReportingManagerName'] = value[2];

    //             // Status
    //             else if (value[0] == 'createdAt') {
    //               var i = 0;
    //               let isMatch = false;
    //               for (i = 0; i < status.length; i++) {
    //                 var res = status[i].substring(0, 2).toLowerCase();
    //                 var res1 = value[2].substring(0, 2).toLowerCase();
    //                 if (res.match(res1)) {
    //                   params['Status'] = status[i];
    //                   isMatch = true;
    //                 }
    //               }
    //               if (isMatch === false) {
    //                 params['Status'] = value[2];
    //               }
    //             }
    //           }
    //         });
    //       }
    //       else {
    //         console.log(loadOptions.filter[0]);
    //         // CompanyRequestId
    //         if (loadOptions.filter[0] == 'CompanyRequestId')
    //           params['CompanyRequestId'] = loadOptions.filter[2];

    //         // Company Name
    //         if (loadOptions.filter[0] == 'AgencyId.CompanyName')
    //           params['AgencyName'] = loadOptions.filter[2];

    //         // Request for
    //         if (loadOptions.filter[0] == '_id'){
    //           var i = 0;
    //           let requestMatch = false;
    //           var result;
    //           for (i = 0; i < Request.length; i++) {
    //             var res = Request[i].substring(0, 2).toLowerCase();
    //             var res1 = loadOptions.filter[2].substring(0, 2).toLowerCase();
    //             if (res.match(res1)) {
    //               params['RequestType'] = Request[i];
    //               requestMatch = true;
                  
    //             }
    //           }
    //           if (requestMatch === false) {
    //             params['RequestType'] = loadOptions.filter[2];
    //           }
    //         }
    //           // params['RequestType'] = loadOptions.filter[2];

    //         // Approver
    //         if (loadOptions.filter[0] == 'ReportingManagerId.FirstName')
    //           params['ReportingManagerName'] = loadOptions.filter[2];

    //         // Status
    //         if (loadOptions.filter[0] == 'createdAt') {
    //           var i = 0;
    //           let isMatch = false;
    //           for (i = 0; i < status.length; i++) {
    //             var res = status[i].substring(0, 2).toLowerCase();
    //             var res1 = loadOptions.filter[2].substring(0, 2).toLowerCase();
    //             if (res.match(res1)) {
    //               params['Status'] = status[i];
    //               isMatch = true;
    //             }
    //           }
    //           if (isMatch === false) {
    //             params['Status'] = loadOptions.filter[2];
    //           }
    //         }
    //         // params['Status'] = loadOptions.filter[2];
    //       }
    //     }

    //     console.log(params);
    //     return apisService.getRequestsByCompanyUserId(params)
    //       .then(res => {
    //         console.log("getRequestsByCompanyUserId :",res);
    //         if (res.success) {
    //           if (res.data.length > 0) {
    //             return {
    //               data: res.data,
    //               totalCount: (res.data.length > 0 ? res.count : 0)
    //             }
    //           }
    //           else {
    //             return {
    //               data: [],
    //               totalCount: 0
    //             }
    //           }
    //         }
    //         else {
    //           // return {
    //           //   data: [],
    //           //   totalCount: 0
    //           // }
    //           tokenService.tokenExpired(res.message);  //SS changes
    //         }
    //       },
    //       (err) => {

    //         return {
    //           data: [],
    //           totalCount: 0
    //         }

    //       });
    //   }
    // }
  }

  ngOnInit() {
   this.spinnerService.displaySpinner(true);
    var userData = this.authServie.getUserData();
    var status = this.authServie.getStatusForCC();
    console.log(status);
    var param = {
      CompanyUserId: userData._id,
      Status: status
    };
    this.apisService.getRequestsByCompanyUserId1(param)
    .subscribe(res => {
      console.log("onInit :",res);
      if (res.success) {
        this.requestList = res.data;
        console.log("requestList :", this.requestList);
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
  click(data) {
    console.log(data);
  }


  getProfilePhoto(data){
    if(data){
      return this.apisService.baseUrl+data;
    }else{
      return this.DefaultPhotoPath;
    }
  }


  sortRequestStatusWise(status: any) {
    // if (this.statusFlag != status) {
    //   this.pageNumber = 0;
    //   this.requestList = []
    // }
    this.statusFlag = status;
    this.apisService.NavigationStatus = status;
    this.getRequestsByCompanyUserId(this.loggedInUserData._id, status);
  }

  nextRecords() {
    this.getRequestsByCompanyUserId(this.loggedInUserData._id, this.statusFlag)
  }


  RequestDetail(RequestData) {
    console.log(RequestData);
  }

  getRequestsByCompanyUserId(CompanyUserId, Status) {
    this.spinnerService.displaySpinner(true);
    console.log(Status);
    var sendData = { skip: 0, take: 10, CompanyUserId: CompanyUserId, Status: Status };
    // this.apisService.getRequestsByCompanyUserId(sendData)
    //   .subscribe(res => {
    //     if(res.success){

    //       if(res.data){
    //         this.pageNumber++;
    //         console.log(res.count);
    //         this.count=res.count;
    //         this.requestList=this.requestList.concat(res.data);            
    //         this.spinnerService.displaySpinner(false);      
    //         console.log(this.requestList);
    //       }else{
    //         this.requestList=res.data;
    //         this.spinnerService.displaySpinner(false);
    //         this.toastService.showInfo(res.message);
    //       }    
    //     }else{
    //       this.spinnerService.displaySpinner(false);
    //       this.toastService.showWarning(res.message);
    //     }
    // });
  }

  public hoveringOver(value: number): void {
    console.log(value);
    this.overStar = value;
    this.percent = 100 * (value / this.max);
    console.log(this.percent)
  };

  public resetStar(): void {
    this.overStar = void 0;
  }

  rateUs(RateData) {
    console.log(RateData);
    this.RequestId = RateData.data._id;

    console.log(this.percent)
    //updateRequestFeedback
    //  this.router.navigate(['corporate-company/dashboard/my-requests']);
    //   this.spinnerService.displaySpinner(false);     
  }

  sendRatingsResponse() {
    var SubmitFeedback = {
      RequestId: this.RequestId,
      Feedback: this.RatingFeedback,
      Ratings: this.rate
    };
    console.log(SubmitFeedback)
    this.spinnerService.displaySpinner(true);
    this.apisService.updateRequestFeedback(SubmitFeedback)
      .subscribe(res => {
        console.log(res)
        if (res.success) {
          //this.rated = true;
          this.spinnerService.displaySpinner(false);
          //this.clear();
          //this.pageNumber = 0;
          //this.requestList = [];
          //this.sortRequestStatusWise(this.statusFlag);        
          this.toastService.showSuccess("Thank you.");  
          window.location.reload();        
        } else {
          this.spinnerService.displaySpinner(false);
          this.toastService.showError(res.message);
        }

      });

  }

  clear() {
    this.rate = 0;
    this.RatingFeedback = "";
  }

  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      console.log(results);
        results.push({
            text: "Weekends",
            value: "weekends"
        });
        return results;
    };
}
 

}
