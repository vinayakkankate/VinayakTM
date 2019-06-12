import { Component, OnInit} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../services/auth.service';
import { DatePipe } from '@angular/common';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { IMyDpOptions,  MyDatePickerModule } from 'mydatepicker';
import { ToastService } from '../../../../services/toast.service';
import { TokenService } from '../../../../services/token.service';
import { Router} from '@angular/router';
import { SpinnerService } from '../../../../services/spinner.service';
import { CarsPipe} from '../../../../pipes/cars.pipe';
import { TransportationsPipe} from '../../../../pipes/transporations.pipe';
import { FlightClassPipe} from '../../../../pipes/flight-class.pipe';
import { FlightTypePipe} from '../../../../pipes/flight-type.pipe';
import { TripTypePipe} from '../../../../pipes/trip-type.pipe';

@Component({
  selector: 'app-corporate-company-new-request',
  templateUrl: './corporate-company-new-request.component.html',
  styleUrls: ['./corporate-company-new-request.component.css']
})
export class CorporateCompanyNewRequestComponent implements OnInit {

  uploadPassport:boolean;
  uploadNationalID:boolean;
  Eligible:boolean
  currentDateTime:any = new Date();
  dataServicePreferredAirlines:CompleterData;
  dataServiceIataList:CompleterData;

  userData:any;
  CompanyUserId : string;
  ReportingManagerId : any=[];
  CompanyId : string;
  Mapping : any;
  
  RequestData : Object = {};
  FlightRequest : any;
  TransferRequest : any;
  CarRequest : any;
  AccomodationRequest : any;
  ReasonForTravelRequest : any;

  FlightType : number=1;
  TripType : number=2;
  DepartureFrom:string
  DepartureCity: string;
  DepartureAirport: string;
  DepartureCode: string;
  DepartureCountryName: string;
  DepartureCountryCode: string;
  ArrivalAirport: string;
  ArrivalCode: string;
  ArrivalTo: string;
  ArrivalCity: string;
  ArrivalCountryName: string;
  ArrivalCountryCode: string;
  DepartureDate : any=null;
  ReturnDate : any=null;
  FlightClass : string;
  PreferredAirlines : string;
  EarliestBookingTime:any;
  ReturnEarliestBookingTime:any;
  MembershipNo : string;
  RewardsClaim : string;
  ReasonForTravel : string; 
  FlightRequestComment : string;
  
  ReasonForTravelComment : string;
  HotelRequestComment : string;
  CheckOutDate:any;
  CheckInDate : any;
  HotelCity : string;
  PreferredPlace : string;

  CarPickupFrom : string;
  CarPickupDate : any=null;
  CarPickupTime : any=null;
  CarDropoffTo : string;
  CarDropoffDate:any;
  CarDropoffTime:any;
  CarType : string;
  CarRequestComment : string;
  CarPickupDateAndTime:any;
  CarDropoffDateAndTime:any
  carDateError:boolean=false;
  CarpickUpFromAirpoort:boolean = false;
  CardropOffFromAirpoort:boolean = false;
  CardeliverVehicle:boolean = false;
  CarselectTime:boolean = false;
  CarNoOfPeople :any;
  CarAirConditioning:boolean = false;

    
  TransferPickupFrom : string;
  TransferPickupDate : any=null;
  TransferPickupTime : any=null;
  TransferDropoffTo : string;
  TransferDropoffDate:any;
  TransferDropoffTime:any;
  TransportationType:any;
  TransferRequestComment : string;
  TransferNoOfPeople : any;
  TransferPickupDateAndTime:any;
  TransferDropoffDateAndTime:any
  transferDateError:boolean=false;
  TransferpickUpFromAirpoort :boolean = false;
  TransferdropOffFromAirpoort:boolean = false;

  departureselect:boolean=true;
  
  
  listedClasses : any = [
    {value:1,name:'Economy Class'},
    {value:2,name:'Premium Economy Class'},
    {value:4,name:'Business Class'},
    {value:3,name:'First Class'}];
  listedCars : any = [{value:1,name:'Sedaan'},{value:2,name:'SUV'},{value:3,name:'Mini'}];
  listedTransportations : any = [{value:1,name:'Train'},{value:2,name:'Bus'},{value:3,name:'Cab'},{value:3,name:'Metro'}];
  listedAirlines:any;
  listedIata:any;
  mappingList:any;

  constructor(
    private spinnerService : SpinnerService,
    public apisService:ApisService,
    private authService:AuthService,
    public toastService:ToastService,
    public tokenService: TokenService,
    private completerService: CompleterService,
    private router:Router) { 

    this.uploadPassport=true;
    this.uploadNationalID = true;
    this.Eligible=true; 
    //this.currentDateTime=new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.currentDateTime=new Date();
    this.getIataList();
    this.getPreferredAirlines();
    this.userData=this.authService.getUserData();
    this.CompanyUserId=this.userData._id;
    this.CompanyId=this.userData.CompanyId._id;
    if(this.userData.ReportingManagerId){
      //this.ReportingManagerId=this.userData.ReportingManagerId._id;
      for(let i=0;i< this.userData.ReportingManagerId.length;i++){
        this.ReportingManagerId.push(this.userData.ReportingManagerId[i]._id);  
      }
      
    }    
    this.getUpdatedUserData({CompanyUserId:this.CompanyUserId});
    this.getMappedRequestsByCompanyId({CompanyId:(this.authService.getUserData().CompanyId._id)});
   }


  getIataList(){
    this.spinnerService.displaySpinner(true);
    this.apisService.getIataList()
      .subscribe(res => {
        // console.log('flights123', res);
      // this.listedAirlines=res.data;
      this.listedIata=res.data;
      this.dataServiceIataList = this.completerService.local(this.listedIata,'Airport,Country','Airport').descriptionField('Country');
      console.log('this.dataServiceIataList', this.dataServiceIataList);
      this.spinnerService.displaySpinner(false);
    });
  }

  getPreferredAirlines(){
    this.spinnerService.displaySpinner(true);
    this.apisService.getPreferredAirlines()
      .subscribe(res => {
        // console.log('AirLines :', res);
      this.listedAirlines=res.data;
      this.dataServicePreferredAirlines = this.completerService.local(this.listedAirlines,'name,city','name').descriptionField('');
      console.log('this.dataServicePreferredAirlines', this.dataServicePreferredAirlines);
      this.spinnerService.displaySpinner(false);
    });
  }

  getArrivalCountryCode(place){
    var tempLength=place['address_components'].length;
    this.ArrivalCountryCode=place['address_components'][tempLength-1]['short_name'];
    this.changeFlightType();
  }

  getDepartureCountryCode(place){
    var tempLength=place['address_components'].length;
    this.DepartureCountryCode=place['address_components'][tempLength-1]['short_name'];
    this.changeFlightType();
  }

  onSelectPreferredAirlines(selected: CompleterItem){
    if (selected) {
      this.PreferredAirlines = selected.originalObject.name;
    }
  }

  onSelectDepartureFrom(selected: CompleterItem){
    debugger;
    if (selected) {
      this.departureselect=false;
      this.DepartureFrom = selected.originalObject.Airport+" , "+selected.originalObject.Country + " (" + selected.originalObject.Code + ")";
      this.DepartureAirport = selected.originalObject.Airport;
      this.DepartureCountryName = selected.originalObject.Country;
      this.DepartureCode = selected.originalObject.Code;
      this.changeFlightType1();
    }
    
  }


  onSelectArrivalTo(selected: CompleterItem){
    if (selected) {
      this.ArrivalTo = selected.originalObject.Airport+" , "+selected.originalObject.Country + " (" + selected.originalObject.Code + ")";;
      this.ArrivalAirport = selected.originalObject.Airport;
      this.ArrivalCountryName = selected.originalObject.Country;
      this.ArrivalCode = selected.originalObject.Code;
      this.HotelCity=this.ArrivalTo;
      this.changeFlightType1();
    }
  }

  changeFlightType1(){
    debugger;
    if(this.ArrivalCountryName==this.DepartureCountryName){
      this.FlightType=1;
    }
    if(this.ArrivalCountryName!=this.DepartureCountryName){
      this.FlightType=2;
    }
  }
  onEarliestBookingTimeChange(event){
    console.log("On earlitime change :", event);
    this.EarliestBookingTime = event;
  }
  onReturnEarliestBookingTimeChange(event){
    this.ReturnEarliestBookingTime = event;
  }
  validateReturnDate(){
    if(!this.DepartureDate){
      return true;
    }else if(this.TripType!=2){
      return true;
    }else{
      return false;
    }
  }

  changeFlightType(){
    debugger;
    if(this.ArrivalCountryCode==this.DepartureCountryCode){
      this.FlightType=1;
    }
    if(this.ArrivalCountryCode!=this.DepartureCountryCode){
      this.FlightType=2;
    }
  }

 saveFlightRequestData() {     
    this.FlightRequest = {
      MembershipNo : this.MembershipNo,
      RewardsClaim : this.RewardsClaim,
      DepartureDate : this.DepartureDate,
      ArrivalCity : this.ArrivalCity,
      ArrivalCountryName : this.ArrivalCountryName,
      ArrivalCountryCode : this.ArrivalCountryCode,
      DepartureCity : this.DepartureCity,
      DepartureCountryName : this.DepartureCountryName,
      DepartureAirport : this.DepartureAirport,
      DepartureCode : this.DepartureCode,
      ArrivalAirport : this.ArrivalAirport,
      ArrivalCode : this.ArrivalCode,
      DepartureCountryCode : this.DepartureCountryCode,

      EarliestBookingTime: this.EarliestBookingTime,
      ReturnEarliestBookingTime: this.ReturnEarliestBookingTime,
      
      ReasonForTravel : this.ReasonForTravel,
      Class : this.FlightClass,
      TripType : this.TripType,
      FlightRequestComment : this.FlightRequestComment,
      PreferredAirlines : this.PreferredAirlines,
      FlightType:this.FlightType
    }
    if(this.ArrivalCountryName==this.DepartureCountryName){
      this.FlightRequest.FlightType=1;
    }else if(this.ArrivalCountryName!=this.DepartureCountryName){
      this.FlightRequest.FlightType=2;
    }
    if(this.TripType==2){
      this.FlightRequest.ReturnDate =this.ReturnDate;
    }
    this.RequestData['FlightRequest'] = this.FlightRequest;
    console.log("saveFlightRequestData RequestData :", this.RequestData);
    // console.log("check uploadNationalID :", this.uploadNationalID);
    // debugger;
   if (this.FlightType == 1) {
     if (this.uploadNationalID) {
       this.navFlightToHotel('save');
     } else {
       this.toastService.showWarning("Upload National identification in profile section");
     }
   } else {
     if (this.uploadPassport) {
       this.navFlightToHotel('save');
     } else {
       this.toastService.showWarning("Upload passport first in profile section");
     }
   }
  }

  getHotelCity(place:object){
    this.HotelCity = place['formatted_address'];
  }
  TransferdropOffFromAirpoortChange(event){
      if(event.target.checked){
        this.TransferDropoffTo = this.ArrivalTo;
        this.TransferDropoffDate = this.DepartureDate;
        this.TransferPickupFrom = this.ArrivalTo;
        this.TransferPickupDate = this.DepartureDate;
      }
  }
  saveAccomodationRequestData() {    
    this.AccomodationRequest = {
      HotelRequestComment : this.HotelRequestComment,
      CheckOut : this.CheckOutDate,
      CheckIn : this.CheckInDate,
      City : this.HotelCity,
      PreferredPlace : this.PreferredPlace
    }
    this.RequestData['AccomodationRequest'] = this.AccomodationRequest;
    console.log("saveAccomodationRequestData RequestData :", this.RequestData);
    this.navHotelToCars('save');
  }  

  validateReturn(){
    if(this.TripType != 2){
      return true;
    }
    else{
      return false;
    }
  }
  airConditioningChange(event){
    this.CarAirConditioning = event.target.checked;
  }

  getCarPickupLocation(place:object){
    console.log("getCarPickupLocation :", place);
    this.CarPickupFrom = place['formatted_address'];
  }
  pickUpFromAirpoortChange(event){
    if(event.target.checked){
      /* this.CarPickupFrom = this.DepartureFrom;
      this.CarPickupDate = this.DepartureDate; */
      this.CarPickupFrom = this.ArrivalTo;
      //this.CarPickupDate = this.DepartureDate;
      this.CarPickupDate = this.DepartureDate;
    }
    //  else {
    //   this.CarPickupFrom = "";
    // }
  }
  transferpickUpFromAirpoortChange(event){
    if(event.target.checked){
      this.TransferPickupFrom = this.ArrivalTo;
      this.TransferPickupDate = this.DepartureDate;
    }
  }
  dropOffFromAirpoortChange(event){
    if(event.target.checked){
    this.CarDropoffTo = this.ArrivalTo;
    this.CarDropoffDate = this.DepartureDate;
    this.CarPickupFrom = this.ArrivalTo;
    this.CarPickupDate = this.DepartureDate;
    }
  }
  getCarDropoffLocation(place:object){
    this.CarDropoffTo = place['formatted_address'];
  }

  onChangeCarPickupDate(pickupDate){
    this.CarPickupDate=pickupDate;
  }

  onCarPickUpDateChange(){
    this.CarPickupTime=null;
    this.CarDropoffDate=null;
    this.CarDropoffTime=null;
    this.concateCarDates();
  }

  onFlightDepartingOnDateChange(){
    this.ReturnDate=null;
    this.CheckInDate =this.DepartureDate;
  }

  returnDateChange(){
    this.CheckOutDate=this.ReturnDate;
  }

  onCarPickUpTimeChange(){
    this.CarDropoffDate=null;
    this.CarDropoffTime=null;
    this.concateCarDates();
  }

  onCarDropoffDateChange(){
    this.CarDropoffTime=null;
    this.concateCarDates();
  }

  onCarDropoffTimeChange(){
    this.concateCarDates();
    if((new Date(this.CarPickupDate).getDate()+ new Date(this.CarPickupDate).getMonth()+ new Date(this.CarPickupDate).getFullYear())== (new Date(this.CarDropoffDate).getDate()+ new Date(this.CarDropoffDate).getMonth()+ new Date(this.CarDropoffDate).getFullYear())){
      if(this.CarPickupTime>this.CarDropoffTime){
        this.CarDropoffTime=null;    
      }
    }    
  }

  concateCarDates(){
    var datePipe = new DatePipe("en-US");

    if(this.CarPickupDate && this.CarPickupTime && this.CarDropoffDate && this.CarDropoffTime){
      var PickupDate : any = datePipe.transform(this.CarPickupDate,'yyyy-MM-dd');
      var PickupTime:any = datePipe.transform(this.CarPickupTime, 'HH:mm');
      var pickupDateAndTime=PickupDate+" "+PickupTime;
      this.CarPickupDateAndTime=new Date(pickupDateAndTime);

      var DropoffDate:any=datePipe.transform(this.CarDropoffDate,'yyyy-MM-dd');
      var DropoffTime:any = datePipe.transform(this.CarDropoffTime, 'HH:mm');
      var dropoffDateAndTime=DropoffDate+" "+DropoffTime;
      this.CarDropoffDateAndTime=new Date(dropoffDateAndTime);  

      if(this.CarDropoffDateAndTime<this.CarPickupDateAndTime){        
        this.carDateError=true;
        this.CarDropoffTime=null;
      }else{
        this.carDateError=false;        
      }      
    }    
  }

  saveCarRequestData() {    
    /* this.CarRequest = {
      CarRequestComment : this.CarRequestComment,
      // CarType : this.CarType,
      PickupDateAndTime : this.CarPickupDateAndTime,
      DropoffDateAndTime:this.CarDropoffDateAndTime,
      DropoffTo : this.CarDropoffTo,
      PickupFrom : this.CarPickupFrom,
      CarNoOfPeople: this.CarNoOfPeople,
      CarAirConditioning: this.CarAirConditioning
    } */
    this.CarRequest = {
      CarRequestComment : this.CarRequestComment,
      // CarType : this.CarType,
      PickupDate : this.CarPickupDateAndTime,
      DropoffDate:this.CarDropoffDateAndTime,
      DropoffTo : this.CarDropoffTo,
      PickupFromLocation : this.CarPickupFrom,
      NumberOfPeople: this.CarNoOfPeople,
      isAirCondition: this.CarAirConditioning
    }
    this.RequestData['CarRequest'] = this.CarRequest;
    console.log("saveCarRequestData RequestData :", this.RequestData);
    this.navCarsToTransfer('save');
  }

  getTransferPickupLocation(place:object){
    this.TransferPickupFrom = place['formatted_address'];
  }

  getTransferDropoffLocation(place:object){
    this.TransferDropoffTo = place['formatted_address'];
  }

  onTransferPickUpDateChange(){
    this.TransferPickupTime=null;
    this.TransferDropoffDate=null;
    this.TransferDropoffTime=null;
    this.concateTransferDates();
  }

  onTransferPickUpTimeChange(){
    this.TransferDropoffDate=null;
    this.TransferDropoffTime=null;
    this.concateTransferDates();
  }

  onTransferDropoffDateChange(){
    this.TransferDropoffTime=null;
    this.concateTransferDates();
  }

  onTransferDropoffTimeChange(){
    this.concateTransferDates();
    if((new Date(this.TransferPickupDate).getDate()+ new Date(this.TransferPickupDate).getMonth()+ new Date(this.TransferPickupDate).getFullYear())== (new Date(this.TransferDropoffDate).getDate()+ new Date(this.TransferDropoffDate).getMonth()+ new Date(this.TransferDropoffDate).getFullYear())){
      if(this.TransferPickupTime>this.TransferDropoffTime){
        this.TransferDropoffTime=null;    
      }
    }    
  }

  concateTransferDates(){
    var datePipe = new DatePipe("en-US");

    if(this.TransferPickupDate && this.TransferPickupTime && this.TransferDropoffDate && this.TransferDropoffTime){
      var PickupDate : any = datePipe.transform(this.TransferPickupDate,'yyyy-MM-dd');
      var PickupTime:any = datePipe.transform(this.TransferPickupTime, 'HH:mm');
      var pickupDateAndTime=PickupDate+" "+PickupTime;
      this.TransferPickupDateAndTime=new Date(pickupDateAndTime);

      var DropoffDate:any=datePipe.transform(this.TransferDropoffDate,'yyyy-MM-dd');
      var DropoffTime:any = datePipe.transform(this.TransferDropoffTime, 'HH:mm');
      var dropoffDateAndTime=DropoffDate+" "+DropoffTime;
      this.TransferDropoffDateAndTime=new Date(dropoffDateAndTime);  

      if(this.TransferDropoffDateAndTime<this.TransferPickupDateAndTime){        
        this.transferDateError=true;
        this.TransferDropoffTime=null;
      }else{
        this.transferDateError=false;        
      }      
    }    
  }

  saveTransferRequestData() {
    
    this.TransferRequest = {
      TransferRequestComment : this.TransferRequestComment,
      PickupDate : this.TransferPickupDateAndTime,
      DropoffDate : this.TransferDropoffDateAndTime,
      TransportationType : this.TransportationType,
      DropoffTo : this.TransferDropoffTo,
      PickupFromLocation : this.TransferPickupFrom,
      NumberOfPeople:this.TransferNoOfPeople
    }
    this.RequestData['TransferRequest'] = this.TransferRequest;
    console.log("saveTransferRequestData RequestData :", this.RequestData);
    this.navTransferToSummary('save');
  }

  saveRequestData(){    
    console.log(this.RequestData['Motivation']);
    if(!this.RequestData['Motivation']){
      this.toastService.showWarning("Please Enter reason for travel");
      return;
    }
    if(!this.Mapping){      
      this.toastService.showWarning("Please select travel company");
      return;
    }
    console.log(this.RequestData);
    if(this.RequestData['FlightRequest']){
        if (this.FlightType == 1) {
          if (!this.uploadNationalID) {
            this.toastService.showWarning("Upload National identification in profile section");
            return;
          }
        }else {
          if (!this.uploadPassport) {
             this.toastService.showWarning("Upload passport first in profile section");
             return;
          }
        } 
    }
    
    /* if(this.ReasonForTravelRequest || this.FlightRequest || this.TransferRequest || this.CarRequest || this.AccomodationRequest) */
    //if(this.FlightRequest || this.TransferRequest || this.CarRequest || this.AccomodationRequest)
    if(this.RequestData['FlightRequest'] || this.RequestData['TransferRequest'] || this.RequestData['CarRequest'] || this.RequestData['AccomodationRequest'])
    {
      if(this.userData.Role == 1) //for admin
        this.RequestData['Status'] = 5;
      else if(this.userData.Role == 2)//for team leader
        this.RequestData['Status'] = 1;
      else if(this.userData.Role == 3)//for team member
        this.RequestData['Status'] = 1;  

      this.RequestData['ReportingManagerId'] = this.ReportingManagerId;
      this.RequestData['CompanyUserId'] = this.CompanyUserId;
      this.RequestData['CompanyId'] = this.CompanyId;
      this.RequestData['MappingId'] = this.Mapping._id; 
      /* this.RequestData['ReasonForTravel'] = this.ReasonForTravelComment; */
      this.RequestData['ReasonForTravel'] = this.ReasonForTravel;
      if(this.Mapping.ToCompanyId._id==this.CompanyId){
        this.RequestData['AgencyId'] = this.Mapping.FromCompanyId;
      }else{
        this.RequestData['AgencyId'] = this.Mapping.ToCompanyId;
      }

      this.RequestData["AgencyEmployeeId"]=this.Mapping.AgencyEmployeeId._id;
      this.RequestData["AgencyReportingManagerId"]=this.Mapping.AgencyReportingManagerId._id;
      //this.RequestData['FirstName']=this.userData.FirstName;
      
     // console.log(JSON.stringify(this.RequestData));
      console.log("******************this.RequestData**********************");
      console.log(this.RequestData);
      this.apisService.createNewRequest(this.RequestData)
        .subscribe(res => {
          console.log(res);
          if(res.success)
          {
            this.toastService.showSuccess(res.message);
             this.router.navigate(['corporate-company/dashboard/my-requests']);
             this.spinnerService.displaySpinner(false);          
          }else{
            // this.spinnerService.displaySpinner(false);
            // this.toastService.showError(res.message);
            this.tokenService.tokenExpired(res.message);    //SS changes
          }
        });
    }else{
      this.toastService.showWarning("Please fill request form properly");
    }
    console.log(this.RequestData)
  }
  onReasonForTravel(item){
    this.ReasonForTravelRequest = item
  }
  saveReasonForTravel(){
    /*var reasonForTravel = {
      ReasonForTravelRequest: this.ReasonForTravelRequest
    }*/
    var reasonForTravel = {
      ReasonForTravelRequest: this.ReasonForTravelRequest.model
    }
    this.RequestData['Motivation'] = reasonForTravel;
    console.log("saveReasonForTravel RequestData :", this.RequestData);
  // this.RequestData['ReasonForTravelRequest'] = this.ReasonForTravelRequest;
  this.navReasonForTravel();
}

  navReasonForTravel(){    
    document.getElementById('reason-for-travel-tab-li').classList.remove("active");
    document.getElementById('flights-tab-li').classList.add("active");
  }

  navFlightToHotel(flag){
    if(flag == 'skip')    
      delete  this.RequestData["FlightRequest"];
    document.getElementById('flights-tab-li').classList.remove("active");
    document.getElementById('hotels-tab-li').classList.add("active");
    document.getElementById('flights-tab').classList.remove("active","in");
    document.getElementById('hotels-tab').classList.add("active","in");
  }

  navHotelToCars(flag){
    if(flag == 'skip')
      delete this.RequestData["AccomodationRequest"];
    document.getElementById('hotels-tab-li').classList.remove("active");
    document.getElementById('cars-tab-li').classList.add("active");
  }

  navCarsToTransfer(flag){
    if(flag =='skip')    
      delete this.RequestData["CarRequest"];
    document.getElementById('cars-tab-li').classList.remove("active");
    document.getElementById('transfer-tab-li').classList.add("active");
  }

  navTransferToSummary(flag){
    if(flag == 'skip')   
      delete this.RequestData["TransferRequest"];
    document.getElementById('transfer-tab-li').classList.remove("active");
    document.getElementById('summary-tab-li').classList.add("active");
  }  
    
  getUpdatedUserData(CompanyUserId){

    this.spinnerService.displaySpinner(true);
    this.apisService.getUpdatedUserData(CompanyUserId)
      .subscribe(res => {
        if(res.success){
          if(res.data){
            this.userData=res.data;
            this.checkEligibility();
            this.spinnerService.displaySpinner(false);
          }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showInfo(res.message);
          }
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showError(res.message);
        }
      });    
  }

 /*  checkEligibility(){
    var datePipe = new DatePipe("en-US");
    var currentDate:any=datePipe.transform(this.currentDateTime,'yyyy-MM-dd');
    if(currentDate>this.userData.PassportExpiryDate)
    {
      this.Eligible=false;
    }else if((this.userData.PassportPath==null || undefined) && (this.userData.PassportExpiryDate==(null || undefined))){
      this.uploadPassport=false;
    }
    if(this.userData.NationalIdPath){
      this.uploadNationalID = true;
    } else{
      this.uploadNationalID = false;
    }
  } */

  checkEligibility(){
    var datePipe = new DatePipe("en-US");
    var currentDate:any=datePipe.transform(this.currentDateTime,'yyyy-MM-dd');
    console.log(this.userData);
    if(currentDate>this.userData.NationalPassportExDate || currentDate>this.userData.ForeignPassportExDate)
    {
      this.Eligible=false;
    }else if(((this.userData.NationalPassportPath==null || undefined) && (this.userData.NationalPassportExDate==(null || undefined))) || ((this.userData.ForeignPassportPath==null || undefined) && (this.userData.ForeignPassportExDate==(null || undefined)))){
      this.uploadPassport=false;
    }
    if(this.userData.NationalIdPath){
      this.uploadNationalID = true;
    } else{
      this.uploadNationalID = false;
    }
  }



  getMappedRequestsByCompanyId(CompanyId:any) {
    this.spinnerService.displaySpinner(true);
    this.apisService.getMappedRequestsByCompanyId(CompanyId)
      .subscribe(res => {
        if(res.success){
          if(res.data){
            this.mappingList=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.spinnerService.displaySpinner(false);
            this.toastService.showWarning("Please Contact Admin for Travel Companies");
          }
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }      
    });
  }

  

  ngOnInit(){
   
  }

  triptype(){
    this.ReturnDate="";
  }

}
