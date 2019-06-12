import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';
import { Observable } from 'rxjs/Observable';
import { RequestStatusTextPipe } from '../../../../pipes/request-status-text.pipe';
import { RequestStatusTextClassPipe } from '../../../../pipes/request-status-text-class.pipe';
import { RequestStatusIconClassPipe } from '../../../../pipes/request-status-icon-class.pipe';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';
declare var jQuery: any;
@Component({
  selector: 'app-corporate-company-all-requests',
  templateUrl: './corporate-company-all-requests.component.html',
  styleUrls: ['./corporate-company-all-requests.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyAllRequestsComponent implements OnInit {

  DefaultPhotoPath: string = '/assets/images/icon/default-user.png';
  requestList: any = [];
  loggedInUserData: any;
  statusFlag: any = null;
  pageNumber: number = 0;
  count: number;
  localArray: any[] = [];
  RequestData = [];

  TravellerRequestArray = [];
  constructor(
    private spinnerService: SpinnerService,
    public apisService: ApisService,
    public authServie: AuthService,
    public tokenService: TokenService,
    public toastService: ToastService,
  ) {
    this.loggedInUserData = authServie.getUserData();
    // this.getRequestListForCompanyById(this.loggedInUserData.CompanyId._id, null)


    // bind requestlist
    this.requestList = {
      load: function (loadOptions: any) {
        var userData = authServie.getUserData();
        var params = {};
        var status = ['Pending', 'In-Progress', 'Confirmed', 'Processed', 'History'];
        var Request = ['CarRequest', 'FlightRequest', 'AccomodationRequest', 'TransferRequest'];
        params = { skip: loadOptions.skip || 0, take: loadOptions.take || 10, CompanyId: userData.CompanyId._id }

        //Getting filter options
        console.log(loadOptions);
        if (loadOptions.filter) {
          // console.log(Array.isArray(loadOptions.filter[0]));
          if (Array.isArray(loadOptions.filter[0])) {
            jQuery.each(loadOptions.filter, function (key, value) {
              console.log("value", value);
              if (value.length == 3) {
                // RequestId
                if (value[0] == 'CompanyRequestId')
                  params['CompanyRequestId'] = value[2];

                // Company Name
                else if (value[0] == 'AgencyId.CompanyName')
                  params['AgencyName'] = value[2];

                // requestFor
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
                else if (value[0] == 'CompanyUserId.LastName')
                  params['EmployeeName'] = value[2];

                // Status
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
                // params['Status'] = value[2];
              }
            });
          }
          else {
            console.log(loadOptions.filter[0]);
            // RequestId
            if (loadOptions.filter[0] == 'CompanyRequestId')
              params['CompanyRequestId'] = loadOptions.filter[2];

            // AgencyName
            if (loadOptions.filter[0] == 'AgencyId.CompanyName')
              params['AgencyName'] = loadOptions.filter[2];

            // RequestFor
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

            // Approver
            if (loadOptions.filter[0] == 'ReportingManagerId.FirstName')
              params['ReportingManagerName'] = loadOptions.filter[2];

            // Requester
            if (loadOptions.filter[0] == 'CompanyUserId.LastName')
              params['EmployeeName'] = loadOptions.filter[2];


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
            // params['Status'] = loadOptions.filter[2];
          }
        }

        console.log(params);
        return apisService.getRequestListForCompanyById(params)
          .then(res => {
            if (res.success) {
              console.log(res);
              if (res.data.length > 0) {
                console.log(res);
                return {
                  data: res.data,
                  totalCount: (res.data.length > 0 ? res.count : 0)
                }
              }
              else {
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
              tokenService.tokenExpired(res.message);  //SS changes
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
    this.getRequestListForCompanyById(this.loggedInUserData.CompanyId._id, this.statusFlag)
  }

  getRequestListForCompanyById(CompanyId, Status) {
    console.log("in get request id ");
    this.spinnerService.displaySpinner(true);
    var sendData = { pageNumber: this.pageNumber, CompanyId: CompanyId, Status: Status };
    this.apisService.getRequestListForCompanyById(sendData)
      .then(res => {
        if (res.success) {
          if (res.data) {
            this.pageNumber++;
            console.log(res.count);
            this.count = res.count;
            this.requestList = this.requestList.concat(res.data);

            this.spinnerService.displaySpinner(false);

            console.log(this.requestList);

          } else {
            this.requestList = res.data;
            this.spinnerService.displaySpinner(false);
            this.toastService.showInfo(res.message);
          }
        } else {
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });

  }

  ngOnInit() {
  }

}
