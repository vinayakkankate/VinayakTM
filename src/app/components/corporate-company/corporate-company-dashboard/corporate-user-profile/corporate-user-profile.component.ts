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
declare var jQuery:any;



@Component({
  selector: 'app-corporate-user-profile',
  templateUrl: './corporate-user-profile.component.html',
  styleUrls: ['./corporate-user-profile.component.css']
})
export class CorporateUserProfileComponent implements OnInit {

DefaultProfileImage : string = "/assets/images/icon/man-user.png";
DefaultText : string = "Not Available";
DefaultPDF:string="/assets/images/pdf.png";
currentDateTime:any = new Date();
EmergencyContactId : any;
EmergencyContact : any;

listedGenders:Array<string>=['Male','Female'];
minDOB:Date;
minPassportExpiryDate:Date;
userData:any;
BaseURL:any="www.travelmediary.com";
companyUsersService: CompleterData;
fileMaxSize:number=2000000;
usersection:any;
passportfiles:any=[null,null];
NationalPassExDate:any;
ForeignExPassportDate:any;
//nationalPassport:any;
//foreignPassport:any;

  
  constructor(
    private spinnerService : SpinnerService,
    public apisService:ApisService,
    private authService:AuthService,
    public toastService:ToastService,
    private completerService: CompleterService)
    { 
      this.minPassportExpiryDate=new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      
      this.userData = this.authService.getUserData();
      console.log(this.userData);
      this.getUpdatedData();
      if(this.userData.EmergencyContactId){
        this.EmergencyContact=this.userData.EmergencyContactId.FirstName;
      }
      var ParametersForEmergencyContactList = {
        CompanyId:this.userData.CompanyId._id,
        UserId:this.userData._id
      }
      this.getAllCompanyUsersForEmergencyContact(ParametersForEmergencyContactList);
    }


    getProfilePhoto(data){
        if(data){
          return this.apisService.baseUrl+data;
        }else{
          return this.DefaultProfileImage;
        }
    }

    getPhoto(data){
        if(data){
          return this.apisService.baseUrl+data;
        }
    }


    openFileInOtherTab(path,event){
      debugger
      if(path){
        window.open(this.apisService.baseUrl+path,"_blank");
      }else{
        event.target.style.pointerEvents="none";
        this.toastService.showWarning("File Not Uploaded");
        setTimeout(()=>{
          event.target.style.pointerEvents="auto";
        },3000);        
      }
    }


    getAllCompanyUsersForEmergencyContact(inputData){
      this.spinnerService.displaySpinner(true);
      this.apisService.getAllCompanyUsersForEmergencyContact(inputData)
      .subscribe(res=>{
        if(res.success){
          this.companyUsersService= this.completerService.local(res.data,'FirstName, LastName','FirstName').descriptionField("LastName");          
          this.spinnerService.displaySpinner(false);  
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showError(res.message);
        }
      })
    }

  getUpdatedData(){
    this.spinnerService.displaySpinner(true);
    var CompanyUserId:any = {CompanyUserId:this.userData._id}
    this.apisService.getUpdatedUserData(CompanyUserId)
      .subscribe(res => {
        if(res.success){
          this.userData=res.data;
          console.log(this.userData);
          this.userData.Type="CC";
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
    userData.CompanyUserId=this.userData._id;
    userData.EmergencyContactId=this.EmergencyContactId;
    this.spinnerService.displaySpinner(true);

    this.apisService.leftUserUpdate(userData)
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
            formData.append('CompanyUserId',this.userData._id);
            this.apisService.companyUserUploadProfilePhoto(formData)
              .subscribe(res=>{
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

    changePassport(event,type){
       if(type == 'national'){
          this.passportfiles[0]=event.target.files;
       }
       if(type == 'foreign'){
        this.passportfiles[1]=event.target.files;
       }

    }
    uploadPassport() {
      

      // console.log("Upload passport :", event);
      console.log(this.ForeignExPassportDate);
      if((this.passportfiles[0] != null && this.NationalPassExDate != undefined) || (this.passportfiles[1] != null && this.ForeignExPassportDate != undefined)){
          this.spinnerService.displaySpinner(true);
          for(let i=0;i<this.passportfiles.length;i++){
            let files = this.passportfiles[i];
            if (files.length > 0) {
              let formData: FormData = new FormData();
              for (let file of files) {
                formData.append('passportPDF', file, file.name);
                formData.append('CompanyUserId',this.userData._id);
                if(i ==0){
                  formData.append('NationalpassportExDate',this.NationalPassExDate); 
                  formData.append('passportType','national'); 
                }
                  
                if(i ==1){
                  formData.append('ForeignpassportExDate',this.ForeignExPassportDate);
                  formData.append('passportType','foreign'); 
                }
                  
                console.log("Send passport data file :", formData);
                this.apisService.companyUserUploadPassport(formData)
                  .subscribe(res=>{
                    // console.log("Responce upload passport :", res);
                    if(res.success){
                      this.spinnerService.displaySpinner(false);
                      this.toastService.showSuccess(res.message);
                      this.getUpdatedData();
                      jQuery("#upload-passport-modal").modal("hide");
                    }else{
                      this.spinnerService.displaySpinner(false);
                      this.toastService.showError(res.message);
                      jQuery("#upload-passport-modal").modal("hide");
                    }
                  }),
                  err => {
                    console.log("error message");
                    this.spinnerService.displaySpinner(false);
                    jQuery("#upload-passport-modal").modal("hide");
                  };
              }
            }
          }
        } 
    }
    /* uploadPassport(event) {
      // console.log("Upload passport :", event);
      this.spinnerService.displaySpinner(true);
      let files = event.target.files;
      if (files.length > 0) {
        let formData: FormData = new FormData();
        for (let file of files) {
          formData.append('passportPDF', file, file.name);
          formData.append('CompanyUserId',this.userData._id);
          console.log("Send passport data file :", formData);
          this.apisService.companyUserUploadPassport(formData)
            .subscribe(res=>{
              // console.log("Responce upload passport :", res);
              if(res.success){
                this.spinnerService.displaySpinner(false);
                this.toastService.showSuccess(res.message);
                this.getUpdatedData();
              }else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showError(res.message);
              }
            }),
            err => {
              console.log("error message");
              this.spinnerService.displaySpinner(false);
            };
        }
      }
    } */

    uploadNationalId(event) {
      console.log(this.userData);
      this.spinnerService.displaySpinner(true);
      let files = event.target.files;
      if (files.length > 0) {
        let formData: FormData = new FormData();
        for (let file of files) {
          formData.append('nationalIdPDF', file, file.name);
          formData.append('CompanyUserId',this.userData._id);
          this.apisService.companyUserUploadNationalId(formData)
            .subscribe(res=>{
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
      }
    }


  ngOnInit() {
    this.usersection="personal";
    if(this.userData.EmergencyContactId){
        this.EmergencyContact=this.userData.EmergencyContactId.FirstName;
    }
  }
  
}
