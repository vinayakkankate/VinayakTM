import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { RequestStatusTextPipe } from '../../../../pipes/request-status-text.pipe';
import { RequestStatusTextClassPipe } from '../../../../pipes/request-status-text-class.pipe';
import { RequestStatusIconClassPipe } from '../../../../pipes/request-status-icon-class.pipe';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { DialogService } from "ng2-bootstrap-modal";
import { RequestBookingDialogComponent } from '../../../../dialog/request-booking-dialog/request-booking-dialog.component';
declare var jQuery: any;

@Component({
  selector: 'app-travel-company-all-requests',
  templateUrl: './travel-company-all-requests.component.html',
  styleUrls: ['./travel-company-all-requests.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyAllRequestsComponent implements OnInit {

  DefaultPhotoPath: string = '/assets/images/icon/default-user.png';
  airportList: any;
  requestList: any = [];
  loggedInUser: any;
  statusFlag: any = null;
  p: number = 1;
  pageNumber: number = 0;
  count: number;
  public reasonforHeaderFilter:any;
  selectedRows: number[];
  user:any;
  selectionChangedBySelectbox: boolean;
  assignTo:any;
  states: any= [{
      "ID": 1,
      "Name": "Alabama"
  }, {
      "ID": 2,
      "Name": "Alaska"
  }, {
      "ID": 3,
      "Name": "Arizona"
  }, {
      "ID": 4,
      "Name": "Arkansas"
  }, {
      "ID": 5,
      "Name": "California"
  }, {
      "ID": 6,
      "Name": "Colorado"
  }, {
      "ID": 7,
      "Name": "Connectictu"
  }]
  constructor(
    public apisService: ApisService,
    public authServie: AuthService,
    private spinnerService: SpinnerService,
    public toastService: ToastService,
    public dialogService: DialogService
  ) {
    this.loggedInUser = authServie.getUserData();
    this.getListOfUser();
    // this.getRequestListForAgencyById(this.loggedInUser.AgencyId._id,null)

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

   /*  this.requestList = {
      load: function (loadOptions: any) {
        var userData = authServie.getUserData();
        var params = {};
        var status = ['Pending', 'In-Progress', 'Confirmed', 'Processed', 'History'];
        var Request = ['CarRequest', 'FlightRequest', 'AccomodationRequest', 'TransferRequest'];
        params = { skip: loadOptions.skip || 0, take: loadOptions.take || 10, AgencyId: userData.AgencyId._id }

        //Getting filter options

        if (loadOptions.filter) {
          // console.log(Array.isArray(loadOptions.filter[0]));
          if (Array.isArray(loadOptions.filter[0])) {
            jQuery.each(loadOptions.filter, function (key, value) {
              console.log(value);
              if (value.length == 3) {
                // 
                if (value[0] == 'CompanyRequestId')
                  params['AgencyRequestId'] = value[2];

                // Agency request Id
                else if (value[0] == 'AgencyRequestId')
                  params['AgencyRequestId'] = value[2];

                // companyName
                else if (value[0] == 'CompanyId.CompanyName')
                  params['CompanyName'] = value[2];

                // Request for
                else if (value[0] == '_id') {
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

                // Approver
                else if (value[0] == 'ReportingManagerId.FirstName')
                  params['ReportingManagerName'] = value[2];

                // Requester
                else if (value[0] == 'CompanyUserId.FirstName')
                  params['EmployeeName'] = value[2];


                else if (value[0] == 'createdAt') {
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

            // Agency request Id
            if (loadOptions.filter[0] == 'AgencyRequestId')
              params['AgencyRequestId'] = loadOptions.filter[2];

            // companyName
            if (loadOptions.filter[0] == 'CompanyId.CompanyName')
              params['CompanyName'] = loadOptions.filter[2];

            // Request
            if (loadOptions.filter[0] == '_id') {
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

            // approver
            if (loadOptions.filter[0] == 'ReportingManagerId.FirstName')
              params['ReportingManagerName'] = loadOptions.filter[2];

            // requester
            if (loadOptions.filter[0] == 'CompanyUserId.FirstName')
              params['EmployeeName'] = loadOptions.filter[2];

            // status
            if (loadOptions.filter[0] == 'createdAt') {
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
        return apisService.getRequestListForAgencyById(params)
          .then(res => {
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
              return {
                data: [],
                totalCount: 0
              }
            }
          },
          (err) => {
            return {
              data: [],
              totalCount: 0
            }
          });
      }
    } */

  }


  getProfilePhoto(data){
    if(data){
      return this.apisService.baseUrl+data;
    }else{
      return this.DefaultPhotoPath;
    }
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
    this.getRequestListForAgencyById(this.loggedInUser.AgencyId._id, this.statusFlag)
  }

  showConfirm(BookData) {
    console.log(BookData);
    var RequestId = BookData.data._id;
    var Status = BookData.data.Status;
    this.dialogService.addDialog(RequestBookingDialogComponent, { RequestId: RequestId })
      .subscribe((result) => {
        if (result == null || result == undefined) {
          let submitQuoteConfirm = confirm("Are you sure you want to book this request without uploading purchase order?");
          if (submitQuoteConfirm == true) {
            this.bookRequest(RequestId, Status);
          }
        } else if (result) {
          let files = result;
          let formData: FormData = new FormData();
          formData.append('RequestId', RequestId);
          for (let file of files) {
            formData.append(file.name, file, file.name);
          }
          this.uploadPurchaseOrder(formData, RequestId, Status);
        }
      });
  }

  uploadPurchaseOrder(data, RequestId, Status) {
    //this.spinnerService.displaySpinner(true);
    this.apisService.uploadPurchaseOrder(data)
      .subscribe(res => {
        if (res.success) {
          this.spinnerService.displaySpinner(false);
          this.toastService.showSuccess(res.message);
          this.bookRequest(RequestId, Status);
        } else {
          this.spinnerService.displaySpinner(false);
          this.toastService.showError(res.message);
        }
      });
  }

  bookRequest(RequestId, Status) {
    //this.RequestId = RequestId;

    var SubmitData = {
      Status: Status,
      RequestId: RequestId,
      BookedBy: this.loggedInUser._id
    };
    //this.spinnerService.displaySpinner(true);
    this.apisService.updateRequestStatus(SubmitData)
      .subscribe(res => {
        if (res.success) {
          // this.pageNumber = 0;
          // this.requestList = [];
          this.spinnerService.displaySpinner(false);
          // this.sortRequestStatusWise(this.statusFlag);
          this.toastService.showSuccess(res.message);
          window.location.reload();
        } else {
          this.spinnerService.displaySpinner(false);
          this.toastService.showError(res.message);
        }
      });
  }

  getRequestListForAgencyById(AgencyId, Status) {
    this.spinnerService.displaySpinner(true);
    var sendData = { pageNumber: this.pageNumber, AgencyId: AgencyId, Status: Status };
    // this.apisService.getRequestListForAgencyById(sendData)
    //   .subscribe(res => {
    //     if(res.success){
    //       if(res.data){
    //         this.pageNumber++;

    //         this.count=res.count;
    //         this.requestList=this.requestList.concat(res.data);  
    //         console.log(res);          
    //         this.spinnerService.displaySpinner(false);      
    //         console.log(this.requestList.length);
    //       }else{
    //         this.requestList=res.data;
    //         this.toastService.showSuccess(res.message);
    //         this.spinnerService.displaySpinner(false);
    //       }    
    //     }else{
    //       this.spinnerService.displaySpinner(false);
    //       this.toastService.showWarning(res.message);
    //     }
    // });
  }

  ngOnInit() {
    this.getListOfUser();
    /** Added by sachin **/
    this.spinnerService.displaySpinner(true);
    var userData = this.authServie.getUserData();
    var status = this.authServie.getStatusForCC();
    console.log(status);
    var param = {
      AgencyId: userData.AgencyId._id,
    };
    this.apisService.getRequestListForAgencyById(param)
      .then(res => {
        console.log("onInit :",res);
        if (res.success) {
          this.requestList = res.data;
          console.log("requestList :", this.requestList);
          this.spinnerService.displaySpinner(false);       
        } else {
          this.spinnerService.displaySpinner(false);
         // this.tokenService.tokenExpired(res.message);
        }
      },
      err => {
        this.toastService.showError("Please check your internet connection");
        this.spinnerService.displaySpinner(false);  
      });

      
  }

  selectionChangedHandler() {
     /*  if(!this.selectionChangedBySelectbox) {
          this.prefix=null;
      } */

      this.selectionChangedBySelectbox=false;
  }

  getListOfUser(){
    this.spinnerService.displaySpinner(true);
    var agencyId:any={
        AgencyId:this.loggedInUser.AgencyId._id
    }
    this.apisService.getListOfAllTravelUsers(agencyId).subscribe(res => {
        if(res.success){
            if(res.data){
                this.spinnerService.displaySpinner(false);
                this.user=res.data;
                console.log(this.user);
            }else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showInfo(res.message);
            }
        }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showWarning(res.message);
        }
    });
}

AssignRequest(event){
  console.log(this.selectedRows)
  console.log(event);
  this.assignTo=event.value;
}

}

