import { Component, OnInit, ViewEncapsulation,ElementRef} from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { ApisService } from '../../../../services/apis.service';
import { TripTypePipe } from '../../../../pipes/trip-type.pipe';
import { MinutesRoundPipe } from '../../../../pipes/minutes-round.pipe';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { FlightTypePipe } from '../../../../pipes/flight-type.pipe';
import { FlightClassPipe } from '../../../../pipes/flight-class.pipe';
import { CarsPipe } from '../../../../pipes/cars.pipe';
import { TransportationsPipe } from '../../../../pipes/transporations.pipe';
import { RequestStatusTextPipe } from '../../../../pipes/request-status-text.pipe';
import { RequestStatusTextClassPipe } from '../../../../pipes/request-status-text-class.pipe';
import { RequestStatusIconClassPipe } from '../../../../pipes/request-status-icon-class.pipe';
import { AuthService } from '../../../../services/auth.service';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;




declare var google: any;
@Component({
  selector: 'app-travel-company-request-details',
  templateUrl: './travel-company-request-details.component.html',
  styleUrls: ['./travel-company-request-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyRequestDetailsComponent implements OnInit {

geocoder: any;
currentDateTime:any = new Date();
loggedInUser : any;
Arr = Array; //Array type captured in a variable
num:number=0;
ServiceFees:number;

Class : any;
Airlines : any;
DepartureDateAndTime : any=null;
ArrivalDateAndTime : any;
ArrivalAirport: string;
ArrivalCode: string;
ArrivalTo: string;
ArrivalCountryName: string;
ReturnArrivalAirport: string;
ReturnArrivalCode: string;
ReturnArrivalTo: string;
ReturnArrivalCountryName: string;
ReturnClass : any;
ReturnAirlines : any;
ReturnDepartureDateAndTime : any;
ReturnArrivalDateAndTime : any;
ReturnEstimatedTime : any;
FlightAdditionalDetails : any;
DepartureFrom:string
DepartureCode: string;
DepartureCountryName: string;
DepartureAirport : any;
DepartureCity : any;
ReturnDepartureFrom:string
ReturnDepartureCode: string;
ReturnDepartureCountryName: string;
ReturnDepartureAirport : any;
ReturnDepartureCity : any;
HotelSearch: any;
HotelName : any;
HotelAddress : any;
HotelLatLng : any;
HotelRating : any;
HotelWebsite : any;
HotelMapUrl : any; 
HotelCity : any; 
Duration : any;
HotelCost : any;
FlightCost : any;
HotelAdditionalDetails : any;
CheckInDateAndTime : any=null;
CheckOutDateAndTime : any;
EstimatedTime : any;


CarHireServiceProvider : any;
CarHireTransportationType : any;
CarHireDistance : any;
CarHireCost : any;
CarHireRate : any;
CarHireDays : any;
CarHireAdditionalDetails : any;

TransferServiceProvider : any;
TransferTransportationType : any;
TransferDistance : any;
TransferCost : any;
TransferPeople : any;
TransferAdditionalDetails : any;

requestData : any;
responseData : any;
RequestId : string;
orders:any;
transferlatLangArr:any=[];
listedClasses : any = [{value:1,name:'Economy Class'},{value:2,name:'Premium Economy Class'},{value:3,name:'First Class'},{value:4,name:'Business Class'}];
//listedCurrency : any = [{value:1,name:'USD'},{value:2,name:'Rupees'},{value:3,name:'Euro'}];
listedCurrency : any=[];
//listedClasses : any = ['Economy','Business','Premium Economy'];
HotelResponse : any;
FlightResponse : any;
CarHireResponse : any;
TransferResponse : any;
DeleteData : any;
listedIata:any;
dataServiceIataList:CompleterData;
fileUrl:any;
fileName:any;
isSameTimeandDate:boolean;
isReturnSameTimeandDate:boolean;
Currency:any;
hotelCurrency:any;
carCurrency:any;
transferCurrency:any;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      public apisService:ApisService,
      public toastService:ToastService,
      private spinnerService : SpinnerService,
      private authService : AuthService,
      private completerService: CompleterService,
      private sanitizer: DomSanitizer,
      private hostElement: ElementRef,
    ) {
      
      this.geocoder = new google.maps.Geocoder();
      this.loggedInUser=authService.getUserData();
      this.currentDateTime=new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      this.RequestId=this.route.snapshot.params['RequestId'];
      if(this.RequestId)
      this.getRequestDataByRequestId(this.RequestId);
      this.getIataList();
      this.getCurrencies();
      this.isSameTimeandDate=false;
      this.isReturnSameTimeandDate=false;
      
    }



  getIataList(){
    this.spinnerService.displaySpinner(true);
    this.apisService.getIataList()
      .subscribe(res => {
      this.listedIata=res.data;
      this.dataServiceIataList = this.completerService.local(this.listedIata,'Airport,Country','Airport').descriptionField('Country');
      this.spinnerService.displaySpinner(false);
    });
  }

  onSelectDepartureFrom(selected: CompleterItem){
    if (selected) {
      this.DepartureFrom = selected.originalObject.Airport+" , "+selected.originalObject.Country;
      this.DepartureAirport = selected.originalObject.Airport;
      this.DepartureCountryName = selected.originalObject.Country;
      this.DepartureCode = selected.originalObject.Code;
    }
  }

  onSelectReturnDepartureFrom(selected: CompleterItem){
    if (selected) {
      this.ReturnDepartureFrom = selected.originalObject.Airport+" , "+selected.originalObject.Country;
      this.ReturnDepartureAirport = selected.originalObject.Airport;
      this.ReturnDepartureCountryName = selected.originalObject.Country;
      this.ReturnDepartureCode = selected.originalObject.Code;
    }
  }


  onSelectReturnArrivalTo(selected: CompleterItem){
    if (selected) {
      this.ReturnArrivalTo = selected.originalObject.Airport+" , "+selected.originalObject.Country;
      this.ReturnArrivalAirport = selected.originalObject.Airport;
      this.ReturnArrivalCountryName = selected.originalObject.Country;
      this.ReturnArrivalCode = selected.originalObject.Code;
    }
  }


  onSelectArrivalTo(selected: CompleterItem){
    if (selected) {
      this.ArrivalTo = selected.originalObject.Airport+" , "+selected.originalObject.Country;
      this.ArrivalAirport = selected.originalObject.Airport;
      this.ArrivalCountryName = selected.originalObject.Country;
      this.ArrivalCode = selected.originalObject.Code;
    }
  }


    SubmitQuotes(){      

      if(this.requestData.FlightRequest){
        if(!this.requestData.FlightResponse){
          this.toastService.showWarning("Please Add Quote(s) for Flight");
          return;
        }else if(this.requestData.FlightResponse){
          if(this.requestData.FlightResponse.Response.length==0){
            this.toastService.showWarning("Please Add Quote(s) for Flight");
            return;
          }          
        }
      }
      if(this.requestData.AccomodationRequest){
        if(!this.requestData.AccomodationResponse){
          this.toastService.showWarning("Please Add Quote(s) for Hotel");
          return;
        }else if(this.requestData.AccomodationResponse){
          if(this.requestData.AccomodationResponse.Response.length==0){
            this.toastService.showWarning("Please Add Quote(s) for Hotel");
            return;
          }          
        }
      }
      if(this.requestData.CarRequest){
        if(!this.requestData.CarResponse){
          this.toastService.showWarning("Please Add Quote(s) for Car Hire");
          return;
        }else if(this.requestData.CarResponse){
          if(this.requestData.CarResponse.Response.length==0){
            this.toastService.showWarning("Please Add Quote(s) for Car Hire");
            return;
          }          
        }
      }
      if(this.requestData.TransferRequest){
        if(!this.requestData.TransferResponse){
          this.toastService.showWarning("Please Add Quote(s) for Transfer");
          return;
        }else if(this.requestData.TransferResponse){
          if(this.requestData.TransferResponse.Response.length==0){
            this.toastService.showWarning("Please Add Quote(s) for Transfer");
            return;
          }          
        }
      }

      if(!this.ServiceFees){
        this.toastService.showWarning("Please Enter Service Fees");
        return;
      }

      if(isNaN(this.ServiceFees)){
        this.toastService.showWarning("Please Enter Valid Amount");
        return;
      }

      let submitQuoteConfirm = confirm("Are you sure you want to submit all quotes");
      if(submitQuoteConfirm == true){
        this.spinnerService.displaySpinner(true);
        var SubmitData={
          //Status:this.requestData.Status,
          Status:this.requestData.Status+2,
          RequestId:this.RequestId,
          QuotedBy:this.loggedInUser._id,
          ServiceFees:this.ServiceFees,
          QuotedDate:new Date()
        };
        this.apisService.updateRequestStatus(SubmitData)
            .subscribe(res=>{
              if(res.success){
                this.getRequestDataByRequestId(this.RequestId);
                this.toastService.showSuccess(res.message);
                this.spinnerService.displaySpinner(false);
              }else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showError(res.message);
              }
          });
      }else {
        return;
      }
    }

    RejectQuotes(){
      this.spinnerService.displaySpinner(true);
        var SubmitData={
          //Status:this.requestData.Status,
          Status:this.requestData.Status + 1,
          RequestId:this.RequestId,
          QuotedBy:this.loggedInUser._id,
          ServiceFees:this.ServiceFees
        };
        this.apisService.updateRequestStatus(SubmitData)
          .subscribe(res=>{
            if(res.success){
              this.getRequestDataByRequestId(this.RequestId);
              this.toastService.showSuccess(res.message);
              this.spinnerService.displaySpinner(false);
            }else{
              this.spinnerService.displaySpinner(false);
              this.toastService.showError(res.message);
            }
        });
    }

    DeleteFlightQuote(quoteId){
      this.DeleteData={
        QuoteId:quoteId,
        RequestId : this.RequestId,
        ResponseKey : "FlightResponse"
      }
      this.DeleteQuote(this.DeleteData);
    }

    DeleteHotelQuote(quoteId){
      this.DeleteData={
        QuoteId:quoteId,
        RequestId : this.RequestId,
        ResponseKey : "AccomodationResponse"
      }
      this.DeleteQuote(this.DeleteData);
    }

    DeleteCarHireQuote(quoteId){
      this.DeleteData={
        QuoteId:quoteId,
        RequestId : this.RequestId,
        ResponseKey : "CarResponse"
      }
      this.DeleteQuote(this.DeleteData);
    }

    DeleteTransferQuote(quoteId){
      this.DeleteData={
        QuoteId:quoteId,
        RequestId : this.RequestId,
        ResponseKey : "TransferResponse"
      }
      this.DeleteQuote(this.DeleteData);
    }

    DeleteQuote(data){
      let deleteResponse = confirm("Press OK to Delete Quote");
      if (deleteResponse == true) {
        this.spinnerService.displaySpinner(true);
        this.apisService.deleteQuoteById(data)
          .subscribe(res=>{
            if(res.success){
              this.getRequestDataByRequestId(this.RequestId);
              this.toastService.showSuccess(res.message);
              this.spinnerService.displaySpinner(false);
            }else{
              this.spinnerService.displaySpinner(false);
              this.toastService.showError(res.message);
            }
          });
      } else {
        return;
      }
    }

    visibleFlightAddQuote(){
      if(this.requestData.FlightResponse){
        if(!this.requestData.FlightResponse.Selected){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }

    visibleHotelAddQuote(){
      if(this.requestData.AccomodationResponse){
        if(!this.requestData.AccomodationResponse.Selected){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }

    visibleCarHireAddQuote(){
      if(this.requestData.CarResponse){
        if(!this.requestData.CarResponse.Selected){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }

    visibleTransferAddQuote(){
      if(this.requestData.TransferResponse){
        if(!this.requestData.TransferResponse.Selected){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }

    getHotelAddress(e){
      console.log(e);
      this.HotelAddress=e.formatted_address;
      this.HotelLatLng=e.geometry.location.lat() +', '+e.geometry.location.lng();
      this.HotelName=e.name;
      this.HotelWebsite=e.website;
      this.HotelMapUrl=e.url;
      this.HotelRating=e.rating;
    }

    sendHotelResponse(form:any){
      this.HotelResponse={
        CheckInDateAndTime : this.CheckInDateAndTime,
        CheckOutDateAndTime : this.CheckOutDateAndTime,
        Cost : this.HotelCost,
        AdditionalDetails : this.HotelAdditionalDetails,
        HotelName : this.HotelName,
        HotelAddress : this.HotelAddress,
        HotelLatLng : this.HotelLatLng,
        HotelWebsite : this.HotelWebsite,
        HotelRating : this.HotelRating,
        HotelMapUrl : this.HotelMapUrl,
        HotelCity : this.HotelCity,
        Duration : this.Duration
      }

      this.responseData = {
        RequestId : this.RequestId,
        AccomodationResponse : this.HotelResponse
      }

      this.updateResponse(this.responseData);
      form.resetForm();
    }

    sendCarHireResponse(form:any){
      this.CarHireResponse = {
        ServiceProvider : this.CarHireServiceProvider,
        TransportationType : this.CarHireTransportationType,
        Distance : this.CarHireDistance,
        Cost : this.CarHireCost,
        Rate : this.CarHireRate,
        Days : this.CarHireDays,
        AdditionalDetails : this.CarHireAdditionalDetails
      }

      this.responseData = {
        RequestId : this.RequestId,
        CarResponse : this.CarHireResponse
      }

      this.updateResponse(this.responseData);
      form.resetForm();
    }


    sendTransferResponse(form:any){
      this.TransferResponse = {
        ServiceProvider : this.TransferServiceProvider,
        TransportationType : this.TransferTransportationType,
        Distance : this.TransferDistance,
        Cost : this.TransferCost,
        AdditionalDetails : this.TransferAdditionalDetails,
        NumberofPeople:this.TransferPeople
      }

      this.responseData = {
        RequestId : this.RequestId,
        TransferResponse : this.TransferResponse
      }

      this.updateResponse(this.responseData);
      form.resetForm();
    }


    sendFlightResponse(form:any){
      this.EstimatedTime = this.ArrivalDateAndTime - this.DepartureDateAndTime
      this.ReturnEstimatedTime = this.ReturnArrivalDateAndTime - this.ReturnDepartureDateAndTime
      this.FlightResponse={
        ReturnDepartureCity : this.ReturnDepartureCity,
        DepartureCity : this.DepartureCity,
        DepartureCode:this.DepartureCode,
        DepartureCountryName:this.DepartureCountryName,
        ReturnDepartureCode:this.ReturnDepartureCode,
        ReturnDepartureCountryName:this.ReturnDepartureCountryName,
        ReturnDepartureAirport : this.ReturnDepartureAirport,
        ReturnArrivalCode:this.ReturnArrivalCode,
        ReturnArrivalCountryName:this.ReturnArrivalCountryName,
        ReturnArrivalAirport : this.ReturnArrivalAirport,
        ArrivalCode:this.ArrivalCode,
        ArrivalCountryName:this.ArrivalCountryName,
        ArrivalAirport : this.ArrivalAirport,
        DepartureAirport : this.DepartureAirport,
        Class : this.Class,
        Airlines : this.Airlines, //domestic or international      
        DepartureDateAndTime : this.DepartureDateAndTime,
        ArrivalDateAndTime : this.ArrivalDateAndTime,
        EstimatedTime : this.EstimatedTime,
        ReturnClass : this.ReturnClass,
        ReturnAirlines : this.ReturnAirlines,
        ReturnDepartureDateAndTime : this.ReturnDepartureDateAndTime,
        ReturnArrivalDateAndTime : this.ReturnArrivalDateAndTime,    
        ReturnEstimatedTime : this.ReturnEstimatedTime,
        Cost : this.FlightCost,
        AdditionalDetails : this.FlightAdditionalDetails
      }
      this.responseData = {
        RequestId : this.RequestId,
        FlightResponse : this.FlightResponse
      }
      
      this.updateResponse(this.responseData);
      form.resetForm();
    }

    updateResponse(response){
      console.log(JSON.stringify(response));
      this.spinnerService.displaySpinner(true);
      this.apisService.updateResponseByRequestId(response)
        .subscribe(res =>{
          if(res.success){
            this.getRequestDataByRequestId(this.RequestId);
            this.toastService.showSuccess(res.message);
            this.spinnerService.displaySpinner(false);
          }else{
            this.toastService.showError(res.message);
            this.spinnerService.displaySpinner(false);
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
            this.num=this.requestData.Ratings;
            this.spinnerService.displaySpinner(false);
            if(this.requestData.TransferRequest)
              this.getLatLangfromAddress();//get lat & lang from address
          }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showSuccess(res.message);
           }          
        }else{
          this.toastService.showError(res.message);
        }
      
    });
  }

  ngOnInit() {
    //this.transferlatLangArr.apply('123');
    this.isSameTimeandDate=false;
    this.isReturnSameTimeandDate=false;

     this.orders= [{
      "ID" : 1,
      "Airline" : "amber air",
      "LoyaltyProgram" :"abc",
      "AccounmtMemnum" : 11800,
      "loyaltytype" : "corporate"
  }, {
    "ID" : 2,
    "Airline" : "amber air2",
    "LoyaltyProgram" :"abc",
    "AccounmtMemnum" : 11801,
    "loyaltytype" : "User"
  }, {
    "ID" : 3,
    "Airline" : "amber air3",
    "LoyaltyProgram" :"abc",
    "AccounmtMemnum" : 11800,
    "loyaltytype" : "corporate"
  }, {
    "ID" : 4,
    "Airline" : "amber air4",
    "LoyaltyProgram" :"abc",
    "AccounmtMemnum" : 11800,
    "loyaltytype" : "User"
  }];
 
  
  }

  /* geocoder:any;
  getLatLangfromAddress(){
    console.log(this.requestData);
    
    let transferAddress=[this.requestData.TransferRequest.PickupFromLocation,this.requestData.TransferRequest.DropoffTo]
    let pickupLangLat=[];
    let dropoffLangLat=[];
    let arr=[];
    let arr2=[];
    let self=this;
   // for(let i=0;i<2;i++){
     // console.log(transferAddress[i]);
        this.geocoder = new google.maps.Geocoder();
        if (this.geocoder) {
            this.geocoder.geocode({
                'address': transferAddress[0]
            }, function(results, status){
                if (status == google.maps.GeocoderStatus.OK) {
                  console.log(results[0]);
                  console.log(results[0].geometry.location.lat());
                  console.log(results[0].geometry.location.lng());
                  //let obj = {"lat":results[0].geometry.location.lat(),"lng":results[0].geometry.location.lng()}
                  //console.log(obj);
                  //this.transferlatLangArr.push("123");
                  //this.transferlatLangArr.push({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
                  //pickupLangLat.push({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
                  //dropoffLangLat.push({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
                  //arr.push(results[0].geometry.location.lat());
                  arr[0]=results[0].geometry.location.lat();
                  //arr.push(results[0].geometry.location.lng());
                  if(i == 0){
                    pickupLangLat.push({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
                    //this.transferlatLangArr.push(pickupLangLat[0]);
                  } 
                  if( i == 1) { 
                    dropoffLangLat.push({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
                    //this.transferlatLangArr.push(dropoffLangLat[0]);
                  }
                  //this.transferlatLangArr[i]=arr[0];
                  //console.log(arr);
                  //Array.apply() 
                }
            });
           // console.log(pickupLangLat);
           // console.log(dropoffLangLat);
            //arr=pickupLangLat;
            //arr2=dropoffLangLat; 
            
        }
    //}
    
   /*  console.log(arr);
    console.log(arr2); 
    console.log(arr[0]);
   this.transferlatLangArr[0]=arr[0];
   this.transferlatLangArr[1]=arr[1];
  //  this.transferlatLangArr[1]=arr2;
    console.log(this.transferlatLangArr);
    console.log(this.transferlatLangArr[0]);
    console.log(arr);
    //this.calculateDistance(this.transferlatLangArr[0][0].lat,this.transferlatLangArr[0][0].lng,this.transferlatLangArr[1][0].lat,this.transferlatLangArr[1][0].lng)
    //this.calculateDistance(this.transferlatLangArr[0].lat,this.transferlatLangArr[0].lng,this.transferlatLangArr[1].lat,this.transferlatLangArr[1].lng)
    //this.calculateDistance(this.transferlatLangArr);
  } */
  getLatLangfromAddress(){
    let transferAddress=[this.requestData.TransferRequest.PickupFromLocation,this.requestData.TransferRequest.DropoffTo];
    for(let i=0;i<2;i++){
      this.codeAddress(transferAddress[i])
      .subscribe(res => {
        console.log(res[0].geometry.location.lat());
        console.log(res[0].geometry.location.lng());
        this.transferlatLangArr.push(res[0].geometry.location.lat());
        this.transferlatLangArr.push(res[0].geometry.location.lng());
        console.log(this.transferlatLangArr);
        if(this.transferlatLangArr.length == 4)
        this.calculateDistance(this.transferlatLangArr[0],this.transferlatLangArr[1],this.transferlatLangArr[2],this.transferlatLangArr[3])
      })
    }
  }

  codeAddress(address: string): Observable<any[]> {
    return Observable.create((observer: Observer<any[]>) => {
        // Invokes geocode method of Google Maps API geocoding.
        this.geocoder.geocode({ address: address }, (
            (results: any[], status: any) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results);
                    observer.complete();
                } else {
                    console.log(
                        'Geocoding service: geocode was not successful for the following reason: '
                        + status
                    );
                    observer.error(status);
                }
            })
        );
    });
}

calculateDistance(lat1,lon1,lat2,lon2) {
  let dist;
  if ((lat1 == lat2) && (lon1 == lon2)) {
    dist=0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      dist=parseInt(dist);
      
  }
  console.log("distance:",dist);
  this.TransferDistance=dist;
}

viewDocument(filepath){
  //"/uploads/1551775407597new credentials.pdf"
    console.log(filepath);
    if(filepath != "" && filepath != undefined)
    {
      this.fileUrl = this.apisService.baseUrl+filepath;
      this.fileName=this.fileUrl.split('/').pop();
      //this.getSantizeUrl(this.fileUrl);
     /*  const iframe = this.hostElement.nativeElement.querySelector('iframe');
      iframe.src = this.fileUrl ; */
      /* $('#abc_frame').attr('src', this.fileUrl); */
      $("#viewdocx").modal('show');
     /*  this.spinnerService.displaySpinner(true);
          this.apisService.companyUserFetchPassport({"path":filepath})
            .subscribe(res =>{
              if(res){
                console.log("in if");
                //this.toastService.showSuccess(res.message);
                this.spinnerService.displaySpinner(false);
                this.fileUrl = URL.createObjectURL(res);
                $("#viewdocx").modal('show');
              }else{
                this.toastService.showError("failed to view document");
                this.spinnerService.displaySpinner(false);
              }  
            }); */
    }else{
      this.toastService.showError("document is not available");
    }       
}

ViewURL():any{
  console.log(this.fileUrl);
  this.fileUrl = this.apisService.baseUrl+"/uploads/1551775407597new credentials.pdf";
  this.fileUrl =this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl);
  return this.fileUrl;
}

preventMouseover(event){
  console.log(event);
  event.preventDefault();
  event.defaultPrevented=true;
  event. stopPropagation();
}


public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

getCurrencies(){
  this.spinnerService.displaySpinner(true);
  this.apisService.getCurrency()
    .subscribe(res => {
      // console.log('AirLines :', res);
      console.log(res.data);
    this.listedCurrency= res.data;
    console.log(this.listedCurrency);
    //this.listedCurrency = this.completerService.local(this.listedCurrency,'Currencyname,symbol','Currencyname').descriptionField('');
    //console.log('this.dataServicePreferredAirlines', this.dataServicePreferredAirlines);
    this.spinnerService.displaySpinner(false);
  });
}

onCheckOutDateChange(){
  console.log("checkOutDate:",this.CheckOutDateAndTime);
  console.log("checkinDate:",this.CheckInDateAndTime);
  this.Duration = Math.floor(( Date.parse(this.CheckOutDateAndTime) - Date.parse(this.CheckInDateAndTime) ) / 86400000);
}

onCheckInDateChange(){
  this.Duration=0;
  this.CheckOutDateAndTime="";
}

calculateCarHireCost(){
  if(this.CarHireDays != "" && this.CarHireDays != undefined && this.CarHireRate != "" && this.CarHireRate != undefined )
    this.CarHireCost=this.CarHireDays * this.CarHireRate
  else   
  this.CarHireCost=0;
}

ondepartureDateChange(){
  this.ArrivalDateAndTime=undefined;
}
checkSameDate(){
  let samedate = this.ArrivalDateAndTime.toDateString() == this.DepartureDateAndTime.toDateString();
  let arrivalTime=new Date(this.ArrivalDateAndTime).getMinutes();
  let deprtureTime=new Date(this.DepartureDateAndTime).getMinutes();
  
  if(this.ArrivalDateAndTime !='' &&  this.ArrivalDateAndTime != undefined && this.DepartureDateAndTime !='' &&  this.DepartureDateAndTime != undefined){
    if(samedate && (arrivalTime == deprtureTime)){
      this.isSameTimeandDate=true;
    }else{
      this.isSameTimeandDate=false;
    }
  }
}
checkReturnSameDate(){
  let samedate = this.ReturnArrivalDateAndTime.toDateString() == this.ReturnDepartureDateAndTime.toDateString();
  let arrivalTime=new Date(this.ReturnArrivalDateAndTime).getMinutes();
  let deprtureTime=new Date(this.ReturnDepartureDateAndTime).getMinutes();
  
  if(this.ReturnArrivalDateAndTime !='' &&  this.ReturnArrivalDateAndTime != undefined && this.ReturnDepartureDateAndTime !='' &&  this.ReturnDepartureDateAndTime != undefined){
    if(samedate && (arrivalTime == deprtureTime)){
      this.isReturnSameTimeandDate=true;
    }else{
      this.isReturnSameTimeandDate=false;
    }
  }
}



}

