import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { RequestStatusTextPipe } from '../../../../pipes/request-status-text.pipe';
import { RequestStatusTextClassPipe } from '../../../../pipes/request-status-text-class.pipe';
import { RequestStatusIconClassPipe } from '../../../../pipes/request-status-icon-class.pipe';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { DialogService } from "ng2-bootstrap-modal";
import { RequestBookingDialogComponent } from '../../../../dialog/request-booking-dialog/request-booking-dialog.component';
declare var jQuery: any;

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
// const URL = 'http://winjitstaging.cloudapp.net:4300/api/uploadPurchaseOrder';

@Component({
  selector: 'app-travel-company-requests',
  templateUrl: './travel-company-my-requests.component.html',
  styleUrls: ['./travel-company-my-requests.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyMyRequestsComponent implements OnInit {

  DefaultPhotoPath: string = 'assets/images/icon/default-user.png';
  airportList: any;
  requestList: any = [];
  loggedInUser: any;
  statusFlag: any = null;
  RequestId: any;
  files: any = [];
  formData: FormData = new FormData();
  p: number = 1;
  // POpath:any;
  pageNumber: number = 0;
  count: number;
  public reasonforHeaderFilter:any;


  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  constructor(
    public apisService: ApisService,
    public authServie: AuthService,
    public spinnerService: SpinnerService,
    public toastService: ToastService,
    public dialogService: DialogService
  ) {
    this.loggedInUser = authServie.getUserData();
   //  this.getRequestsByAgencyEmployeeId(this.loggedInUser._id,null);

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

  /*   this.requestList = {
      load: function (loadOptions: any) {
        var userData = authServie.getUserData();
        var params = {};
        var status = ['Pending', 'In-Progress', 'Confirmed', 'Processed', 'History'];
        var Request = ['CarRequest', 'FlightRequest', 'AccomodationRequest', 'TransferRequest'];
        params = { skip: loadOptions.skip || 0, take: loadOptions.take || 10, AgencyEmployeeId: userData._id }

        //Getting filter options

        if (loadOptions.filter) {
          console.log(loadOptions.filter);
          if (Array.isArray(loadOptions.filter[0])) {
            jQuery.each(loadOptions.filter, function (key, value) {
              console.log(value);
              if (value.length == 3) {
                // 
                if (value[0] == 'CompanyRequestId')
                  params['CompanyRequestId'] = value[2];

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
            if (loadOptions.filter[0] == 'ReportingManagerId.FirstName')
              params['ReportingManagerName'] = loadOptions.filter[2];

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

            // requester
            if (loadOptions.filter[0] == 'CompanyUserId.FirstName')
              params['EmployeeName'] = loadOptions.filter[2];

            // approver
            if (loadOptions.filter[0] == 'ReportingManagerId.FirstName')
            params['ReportingManagerName'] = loadOptions.filter[2];

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
        return apisService.getRequestsByAgencyEmployeeId(params)
          .then(res => {
            if (res.success) {
              if (res.data.length > 0) {
                console.log("requestList",res);
                toastService.showSuccess(res.message);
                return {
                  data: res.data,
                  totalCount: (res.data.length > 0 ? res.count : 0)
                }
              }
              else {
                toastService.showWarning(res.message);
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
    }   */

  }

  sortRequestStatusWise(status: any) {
    if (this.statusFlag != status) {
      this.pageNumber = 0;
      this.requestList = [];
    }
    this.statusFlag = status;
    this.nextRecords()
  }

  nextRecords() {
    this.getRequestsByAgencyEmployeeId(this.loggedInUser._id, this.statusFlag)
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
    this.RequestId = RequestId;

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



  getRequestsByAgencyEmployeeId(AgencyEmployeeId, Status) {
    this.spinnerService.displaySpinner(true);
    var sendData = { pageNumber: this.pageNumber, AgencyEmployeeId: AgencyEmployeeId, Status: Status };
    this.apisService.getRequestsByAgencyEmployeeId(sendData)
      .then(res => {
        if (res.success) {
          if (res.data) {
            this.pageNumber++;
            console.log(res.count);
            this.count = res.count;
            this.requestList = this.requestList.concat(res.data);
            this.spinnerService.displaySpinner(false);
            console.log(this.requestList.length);
          } else {
            this.requestList = res.data;
            //this.toastService.showSuccess(res.message);
            this.spinnerService.displaySpinner(false);
          }
        } else {
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });
  }

  /*  // uploadPo(event){
  
    // }
  
    // uploadAllPO(){
      
    // }
  
    uploadPO(event) {
      this.spinnerService.displaySpinner(true);
      // console.log(event.target.files.FileList[0])
      this.files.push(event.target.files[0]);
          console.log(this.files);
      // if (this.files.length > 0) {
       
      //   for (let file of this.files) {
      //     console.log(file.name)
      //     this.formData.append(file.name, file, file.name);
          
      //   }
  
       
      // }
    }
  
    uploadAllPO()
    {
      console.log(this.formData)
      this.formData.append('RequestId',this.RequestId);
      this.apisService.travelAgencyUploadPo(this.formData)
      .subscribe(res=>{
        if(res.success){
          this.spinnerService.displaySpinner(false);
          this.toastService.showSuccess(res.message);
          // this.getUpdatedData();
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showError(res.message);
        }
      });
  
    // let submitQuoteConfirm = confirm("Are you sure you want to book this request?");
    // if(submitQuoteConfirm == true){
    //   var SubmitData={
    //     Status:Status,
    //     RequestId:RequestId,
    //     BookedBy:this.loggedInUser._id
    //   };
    //   this.spinnerService.displaySpinner(true);
    //   this.apisService.updateRequestStatus(SubmitData)
    //       .subscribe(res=>{
    //         if(res.success){
    //           this.spinnerService.displaySpinner(false);
    //           this.getRequestsByAgencyEmployeeId(this.loggedInUser._id,null)
    //           this.toastService.showSuccess(res.message);
    //         }else{
    //           this.spinnerService.displaySpinner(false);
    //           this.toastService.showError(res.message);
    //         }
    //     });
    // }else {
    //   return;
    // }
     }
  
     
    */
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  TestFileType(fileName, fileTypes) {
    var myReturn = false;

    if (!fileName) return;

    var dots = fileName.split(".");

    //get the part AFTER the LAST period.

    var fileType = dots[dots.length - 1];

    if (fileTypes.indexOf(fileType) != -1)

      myReturn = true;

    else {
      //   this.scrollWin();
      //   this.updateProfileForm.controls[value].reset();
      // this.flashMessagesService.grayOut(true);
      //             this.flashMessagesService.show("Please only upload files that end in types: \n\n" + (fileTypes.join(" .")) + "\n\nPlease select a new file and try again.", {
      //               cssClass:'alert-danger',
      //               timeout:3000});

      alert("Please only upload files that end in types: \n\n" + (fileTypes.join(" .")) + "\n\nPlease select a new file and try again.");
    }

    return myReturn;

  }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {

      file.withCredentials = false;
    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };

    /** Added by sachin **/
     this.spinnerService.displaySpinner(true);
      var userData = this.authServie.getUserData();
      var status = this.authServie.getStatusForCC();
      console.log(status);
      var param = {
        AgencyEmployeeId: userData._id,
        Status: status
      };
      this.apisService.getRequestsByAgencyEmployeeId(param)
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
      /* this.apisService.getRequestsByAgencyEmployeeId(param)
      .then(res => {
        if (res.success) {
          if (res.data.length > 0) {
            console.log("requestList",res);
            this.toastService.showSuccess(res.message);
            this.requestList=res.data;
             return {
              data: res.data,
              totalCount: (res.data.length > 0 ? res.count : 0)
            } 
          }
          else {
            this.toastService.showWarning(res.message);
            this.requestList=[]
             return {
              data: [],
              totalCount: 0
            } 
          }
          this.spinnerService.displaySpinner(false);
        }
        else {
          return {
            data: [],
            totalCount: 0
          }
          this.spinnerService.displaySpinner(false);
        }
      },
      (err) => {
        return {
          data: [],
          totalCount: 0
        }
      });  */

      


  }

}

