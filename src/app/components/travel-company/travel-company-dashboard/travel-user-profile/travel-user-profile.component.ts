import { Component, OnInit,ElementRef,Input } from '@angular/core';
import {Http, Response, Request, RequestMethod} from '@angular/http';
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {DatePipe} from '@angular/common'
import { IMyDpOptions,  MyDatePickerModule } from 'mydatepicker';
import { SpinnerService } from '../../../../services/spinner.service';


@Component({
  selector: 'app-travel-user-profile',
  templateUrl: './travel-user-profile.component.html',
  styleUrls: ['./travel-user-profile.component.css']
})
export class TravelUserProfileComponent implements OnInit {

DefaultProfileImage : string = "http://placehold.it/270x263";
DefaultText : string = "Not Available";

EmergencyContactId : any;
EmergencyContact : any;

listedGenders:Array<string>=['Male','Female'];
minDOB:Date;
userData:any;
BaseURL:any="www.travelmediary.com";
agencyUsersService: CompleterData;
fileMaxSize:number=2000000;

  constructor(
    private spinnerService : SpinnerService,
    public apisService:ApisService,
    private authService:AuthService,
    public toastService:ToastService,
    private completerService: CompleterService)
    { 
      
      this.userData = this.authService.getUserData();
      this.getUpdatedData();
      if(this.userData.EmergencyContactId){
        this.EmergencyContact=this.userData.EmergencyContactId.FirstName;
      }
      var ParametersForEmergencyContactList = {
        AgencyId:this.userData.AgencyId._id,
        UserId:this.userData._id
      }
      this.getAllAgencyUsersForEmergencyContact(ParametersForEmergencyContactList);
    }


    getProfilePhoto(data){
      console.log(data);
        if(data){
          return this.apisService.baseUrl+data;
        }else{
          return this.DefaultProfileImage;
        }
    }

    getAllAgencyUsersForEmergencyContact(inputData){
      this.spinnerService.displaySpinner(true);
      this.apisService.getAllAgencyUsersForEmergencyContact(inputData)
      .subscribe(res=>{
        if(res.success){
          this.agencyUsersService= this.completerService.local(res.data,'FirstName, LastName','FirstName').descriptionField("LastName");          
          this.spinnerService.displaySpinner(false);  
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showError(res.message);
        }
      })
    }

  getUpdatedData(){
    this.spinnerService.displaySpinner(true);
    var AgencyUserId:any = {AgencyUserId:this.userData._id}
    this.apisService.getUpdatedTravelAgencyUserData(AgencyUserId)
      .subscribe(res => {
        if(res.success){
          this.userData=res.data;
          this.userData.Type="TC";
          this.authService.setUserData(this.userData);
          this.userData = this.authService.getUserData();
          this.spinnerService.displaySpinner(false);
        }else{
          this.spinnerService.displaySpinner(true);
          this.toastService.showWarning(res.message);
        }
      });
  }

  onSelectEmergencyContact(selected: CompleterItem){
    if (selected) {
      this.EmergencyContactId = selected.originalObject._id;
    }
  }

  editProfile(userData){
    userData.AgencyUserId=this.userData._id;
    userData.EmergencyContactId=this.EmergencyContactId;
    this.spinnerService.displaySpinner(true);

    this.apisService.updateAgencyUserProfile(userData)
      .subscribe(res=>{
        if(res.success){
          this.toastService.showSuccess(res.message);
          this.spinnerService.displaySpinner(false);
          this.getUpdatedData();
        }else{
          this.toastService.showSuccess(res.message);
          this.spinnerService.displaySpinner(false);
        }
      });
  }

    checkFileMaxSize(file){
        if(file.size<this.fileMaxSize){
          return true;
        }else{
          return false;
        }
    }


    checkFileType(file){
        var rule="^image/";
        var regex=new RegExp(rule);
        if(file.type=="application/pdf" || regex.test(file.type)){
          return true;
        }else{
          return false;
        }
    }

    uploadProfilePhoto(event) {

        if(!event.target.files || event.target.files.length<1){
          event.target.value=null;
          return;
        }

        if(event.target.files.length>1){
          this.toastService.showWarning("Max 1 files can be selected at once.");
          event.target.value=null;
          return;
        }


        if(!this.checkFileMaxSize(event.target.files[0])){
          this.toastService.showWarning(event.target.files[0].name+" Size more than 2MB");    
          event.target.value=null;
          return;           
        }

        if(!this.checkFileType(event.target.files[0])){
          this.toastService.showWarning(event.target.files[0].name+" Not accepted, invalid file format, only image/pdf files can be accepted");    
          event.target.value=null;
          return;           
        }      

        this.spinnerService.displaySpinner(true);
            let formData: FormData = new FormData();  
            formData.append('photo', event.target.files[0]);
            formData.append('AgencyUserId',this.userData._id);
            this.apisService.agencyUserUploadProfilePhoto(formData)
              .subscribe(res=>{
                event.target.value=null;
                if(res.success){
                  this.spinnerService.displaySpinner(false);
                  this.toastService.showSuccess(res.message);
                  this.getUpdatedData();
                }else{
                  this.spinnerService.displaySpinner(false);
                  this.toastService.showError(res.message);
                }
              });
        
      
    }

ngOnInit() {
  if(this.userData.EmergencyContactId){
      this.EmergencyContact=this.userData.EmergencyContactId.FirstName;
  }
}
  
}


