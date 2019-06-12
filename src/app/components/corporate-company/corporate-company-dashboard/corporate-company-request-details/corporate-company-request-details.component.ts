import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { ApisService } from '../../../../services/apis.service';
import { TripTypePipe } from '../../../../pipes/trip-type.pipe';
import { MinutesRoundPipe } from '../../../../pipes/minutes-round.pipe';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../services/toast.service';
import { TokenService } from '../../../../services/token.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { FlightTypePipe } from '../../../../pipes/flight-type.pipe';
import { FlightClassPipe } from '../../../../pipes/flight-class.pipe';
import { CarsPipe } from '../../../../pipes/cars.pipe';
import { TransportationsPipe } from '../../../../pipes/transporations.pipe';


@Component({
  selector: 'app-corporate-company-request-details',
  templateUrl: './corporate-company-request-details.component.html',
  styleUrls: ['./corporate-company-request-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyRequestDetailsComponent implements OnInit {
  

  Arr = Array; //Array type captured in a variable
  num:number=0;

requestData : any;
responseData : any;
RequestId : string;
SelectedFlightResponse : any;
FlightResponseCommentsByTL : string;
SelectedHotelResponse : any;
HotelResponseCommentsByTL : string;
SelectedCarHireResponse : any;
CarHireResponseCommentsByTL : string;
SelectedTransferResponse : any;
TransferResponseCommentsByTL : string;
loggedInUser : any;
isReportingManager:boolean;

  constructor(
    private spinnerService : SpinnerService,
    public toastService:ToastService,
    public tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    public apisService:ApisService,
    public authService:AuthService)
  {
    this.loggedInUser=authService.getUserData();
    this.RequestId=this.route.snapshot.params['RequestId'];
    if(this.RequestId)
    this.getRequestDataByRequestId(this.RequestId);
  }

    SubmitSelections(){
      if(this.requestData.FlightRequest){
        if(this.requestData.FlightResponse){
          if(!this.requestData.FlightResponse.Selected){
            this.toastService.showWarning("Please Select Flight Response");
            return;  
          }
          
        }
      }
      if(this.requestData.AccomodationRequest){
        if(this.requestData.AccomodationResponse){
          if(!this.requestData.AccomodationResponse.Selected){
            this.toastService.showWarning("Please Select Hotel Response");
            return;  
          }
          
        }
      }
      if(this.requestData.CarRequest){
        if(this.requestData.CarResponse){
          if(!this.requestData.CarResponse.Selected){
            this.toastService.showWarning("Please Select Car Hire Response");
            return;  
          }
          
        }
      }
      if(this.requestData.TransferRequest){
        if(this.requestData.TransferResponse){
          if(!this.requestData.TransferResponse.Selected){
            this.toastService.showWarning("Please Select Transfer Response");
            return;  
          }
          
        }
      }

      let submitSelectionConfirm = confirm("Are you sure you want to submit all selections");
      if(submitSelectionConfirm == true){
      this.spinnerService.displaySpinner(true);
      var SubmitData={
        Status:this.requestData.Status,
        RequestId:this.RequestId,
        ApprovedBy:this.loggedInUser._id
      };
      this.apisService.updateRequestStatus(SubmitData)
          .subscribe(res=>{
            if(res.success){
              this.spinnerService.displaySpinner(false);
              this.getRequestDataByRequestId(this.RequestId);
              this.toastService.showSuccess(res.message);              
            }else{
              // this.spinnerService.displaySpinner(false);
              // this.toastService.showWarning(res.message);
              this.tokenService.tokenExpired(res.message);    //SS changes
            }
          });
      }else{
        return;
      }
    }

    updateFlightSelection(){
      if(!this.SelectedFlightResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      }
      this.responseData = {
        FlightResponse : {        
          Selected : this.SelectedFlightResponse._id,
          Cost : this.SelectedFlightResponse.Cost,
          CommentsByTL : this.FlightResponseCommentsByTL
        }
      }
      this.updateResponseSelection(this.responseData);
    }

    editFlightSelection(res){
      /* if(!this.SelectedFlightResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      } */
      this.responseData = {
        FlightResponse : {        
          Selected : null,
          Cost : 0,
          CommentsByTL : null,
          reSelection:true
        }
      }
      this.updateResponseSelection(this.responseData);
    }
    updateHotelSelection(){
      console.log(this.SelectedHotelResponse);
      if(!this.SelectedHotelResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      }
      this.responseData = {
        AccomodationResponse : {        
          Selected : this.SelectedHotelResponse._id,
          Cost : this.SelectedHotelResponse.Cost,
          CommentsByTL : this.HotelResponseCommentsByTL
        }
      }
      this.updateResponseSelection(this.responseData);
    }

    editHotelSelection(res){
      /* if(!this.SelectedHotelResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      } */
      console.log(res);
      this.responseData = {
        AccomodationResponse : {        
          Selected : null,
          Cost : res.Cost,
          CommentsByTL : null,
          reSelection:true
        }
      }
      this.updateResponseSelection(this.responseData);
    }

    updateCarHireSelection(){
      if(!this.SelectedCarHireResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      }
      this.responseData = {
        CarResponse : {        
          Selected : this.SelectedCarHireResponse._id,
          Cost : this.SelectedCarHireResponse.Cost,
          CommentsByTL : this.CarHireResponseCommentsByTL
        }
      }
      this.updateResponseSelection(this.responseData);
    }
    editCarHireSelection(res){
      /* if(!this.SelectedCarHireResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      } */
      this.responseData = {
        CarResponse : {        
          Selected : null,
          Cost : res.Cost,
          CommentsByTL : null,
          reSelection:true
        }
      }
      this.updateResponseSelection(this.responseData);
    }

    updateTransferSelection(){
      console.log(this.SelectedTransferResponse);
      if(!this.SelectedTransferResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      }
      this.responseData = {
        TransferResponse : {        
          Selected : this.SelectedTransferResponse._id,
          Cost : this.SelectedTransferResponse.Cost,
          CommentsByTL : this.TransferResponseCommentsByTL
        }
      }
      this.updateResponseSelection(this.responseData);
    }

    editTransferSelection(res){
      /* console.log(this.SelectedTransferResponse);
      if(!this.SelectedTransferResponse){
        this.toastService.showWarning("Please Select Any Quote");
        return;
      } */
      console.log(res);
      this.responseData = {
        TransferResponse : {        
          Selected : null,
          Cost : res.Cost,
          CommentsByTL : null,
          reSelection:true
        }
      }
      this.updateResponseSelection(this.responseData);
    }

    updateResponseSelection(data){
      this.spinnerService.displaySpinner(true);
      data.RequestId=this.RequestId;
      this.apisService.updateResponseSelectionByTL(data)
        .subscribe(res=>{
          if(res.success){
            this.spinnerService.displaySpinner(false);
            this.getRequestDataByRequestId(this.RequestId);
            this.toastService.showSuccess(res.message);      
          }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showWarning(res.message);
          }
      });
    }
    

    getRequestDataByRequestId (RequestId) {
      this.spinnerService.displaySpinner(true);
      var sendData = {RequestId:RequestId};
      this.apisService.getRequestDataByRequestId(sendData)
        .subscribe(res => {
          if(res.success){
            if(res.data){
              console.log(res.data);
              this.requestData=res.data; 
              if (this.requestData.ReportingManagerId.some(e => e._id == this.loggedInUser._id)) {
                this.isReportingManager = true;
              }else{
                this.isReportingManager =false;
              }
              console.log(this.isReportingManager);
              this.num=this.requestData.Ratings;
              console.log(this.num);
              this.spinnerService.displaySpinner(false);
            }else{
              this.spinnerService.displaySpinner(false);
              this.toastService.showSuccess(res.message);
             }          
          }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showWarning(res.message);
          }        
      });
    }

  ngOnInit() {
  }

  approveRejectRequest(status){
    let statusno=0;
    if(status =="approve"){
      /* if(this.requestData.ReportingManagerId._id == this.loggedInUser._id && this.loggedInUser.Role == 1){ */
      if(this.isReportingManager && this.loggedInUser.Role == 1){
        statusno = 4; 
      }else{
        statusno = 2;
      }
        
    }else if (status =="reject"){
     /* if(this.requestData.ReportingManagerId._id == this.loggedInUser._id && this.loggedInUser.Role == 1){ */
     if(this.isReportingManager && this.loggedInUser.Role == 1){
        statusno = 3; 
      }else{
        statusno = 1
      }
    }else if (status =="Quoteapprove"){
         statusno = 1
     }
    this.spinnerService.displaySpinner(true);
      var SubmitData={
        Status:this.requestData.Status + statusno,
        RequestId:this.RequestId,
        ApprovedBy:this.loggedInUser._id,
        comment:"my comment for sample"
      };
      this.apisService.updateRequestStatus(SubmitData)
        .subscribe(res=>{
          if(res.success){
            this.spinnerService.displaySpinner(false);
            this.getRequestDataByRequestId(this.RequestId);
            this.toastService.showSuccess(res.message);   
            this.router.navigate(['corporate-company/dashboard/home']);           
          }else{
             this.spinnerService.displaySpinner(false);
            // this.toastService.showWarning(res.message);
            this.tokenService.tokenExpired(res.message);    //SS changes
          }
        });
  }

  SubmitQuotes(){      

    if(this.requestData.FlightRequest){
      if(this.requestData.FlightResponse){
        if(!this.requestData.FlightResponse.Selected){
          this.toastService.showWarning("Please Select Quote(s) for Flight");
          return;
        }          
      }
    }
    if(this.requestData.AccomodationRequest){
      if(!this.requestData.AccomodationResponse){
        if(this.requestData.AccomodationResponse.Selected){
          this.toastService.showWarning("Please Select Quote(s) for Hotel");
          return;
        }          
      }
    }
    if(this.requestData.CarRequest){
      if(this.requestData.CarResponse){
        if(!this.requestData.CarResponse.Selected){
          this.toastService.showWarning("Please Select Quote(s) for Car Hire");
          return;
        }          
      }
    }
    if(this.requestData.TransferRequest){
      if(this.requestData.TransferResponse){
        if(!this.requestData.TransferResponse.Selected){
          this.toastService.showWarning("Please Select Quote(s) for Transfer");
          return;
        }          
      }
    }

    let submitQuoteConfirm = confirm("Are you sure you want to submit all quotes");
    if(submitQuoteConfirm == true){
      this.approveRejectRequest('Quoteapprove')
    }else {
      return;
    }
  }

}

