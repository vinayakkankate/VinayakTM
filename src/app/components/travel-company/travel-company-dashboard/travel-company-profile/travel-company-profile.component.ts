import { Component, OnInit,ElementRef,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Http, Response, Request, RequestMethod} from '@angular/http';
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FileUploader} from 'ng2-file-upload'
import { FileSelectDirective } from 'ng2-file-upload';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {DatePipe} from '@angular/common'
import { IMyDpOptions,  MyDatePickerModule } from 'mydatepicker';
import { SpinnerService } from '../../../../services/spinner.service';

const URL = 'www.travelmediary.com/api/';
//const URL = 'http://winjitstaging.cloudapp.net:4300/api/';
const profilePicApi='uploadCompanyLogo';
// const passportPicApi='agencyUserUploadPassportPhoto/';
// const nationalIdPicApi='agencyUserUploadNationalIdPhoto/';

@Component({
  selector: 'app-travel-company-profile',
  templateUrl: './travel-company-profile.component.html',
  styleUrls: ['./travel-company-profile.component.css']
})
export class TravelCompanyProfileComponent implements OnInit {
addressOfCompany : string;
edit:boolean;
userData:any;
companyData:any;
countryList:Array<Object>;
updatedData:any;
admin:boolean;
addressParts:any;
public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
updateCompanyProfileForm : FormGroup;   
dataService: CompleterData;      
Country:any;
fileMaxSize:number=2000000;
CompanyLogoPlaceHolder:string="http://placehold.it/270x263";
fileToUpload:any=null;

  
    constructor(public fb:FormBuilder,
        public spinnerService:SpinnerService,
        public apisService:ApisService,
        private authService:AuthService,
        public toastService:ToastService,
        private completerService: CompleterService,
        public router:Router,
        private el: ElementRef,
        private http:Http) {
            this.addressParts=null;
            this.userData = this.authService.getUserData();
            if(this.userData.Role==1){
              this.admin=true;
              this.companyData= this.authService.getCompanyData();
              this.getUpdatedCompanyData();
            }     
            this.edit=false;    
            this.admin=false;
            this.getListOfCountries();

            this.updateCompanyProfileForm=fb.group({
              'CompanyName':[null,Validators.required],
              'Website':[null,Validators.required],
              'ContactNumber':[null,Validators.required],
              'Address1' : [null,Validators.required],
              'Address2' : [null,Validators.required],
              'City' : [null,Validators.required],
              'Country':[null,Validators.required],
              'SalesTaxNumber':[null,Validators.required],
              'RegistrationNumber':[null,Validators.required],
              'VATNumber':[null,Validators.required],
              'photo':[null,Validators.required]
            });
        }

    getListOfCountries(){
        this.spinnerService.displaySpinner(true);
        this.apisService.getCountries()
          .subscribe(res => {
            this.countryList=res.data;
            this.dataService = this.completerService.local(this.countryList,'name,city','name').descriptionField('');       
            this.spinnerService.displaySpinner(false);
        });
    }   
    editProfile(){
      this.edit=true;
    }
    goBack(){
      this.edit=false;
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

    saveFile(event){
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

        this.fileToUpload=event.target.files[0];
        event.target.value=null;
        return;

    }


    getPhoto(data){
        if(data){
          return this.apisService.baseUrl+data;
        }else{
          return this.CompanyLogoPlaceHolder;
        }
    }

    upload(api,data,type) {
        
        //create a new fromdata instance
        let formData = new FormData();
        
        //append the key name 'photo' with the first file in the element
        formData.append(type, data.files.item(0));
        formData.append('CompanyId',this.companyData._id)
        //call the angular http method
        this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
          .post(URL+api,formData).map((res:Response) => res.json())
          .subscribe(
          //map the success function and alert the response
           (success) => {
            this.toastService.showSuccess("File uploaded successfully");

          },
          (error) => {
            this.toastService.showError("File upload failed");
          });
              
    }


    public onSelectCountry(selected: CompleterItem){
        if (selected) {
          this.Country = selected.originalObject.name;
        }
    }

    TestFileType(fileName, fileTypes,value) {
        var myReturn = false;

        if (!fileName) return;

        var dots = fileName.split(".");

        //get the part AFTER the LAST period.

        var fileType = dots[dots.length-1];

        if (fileTypes.indexOf(fileType) != -1)

        myReturn = true;

        else{
          this.scrollWin();
          this.updateCompanyProfileForm.controls[value].reset();
        this.toastService.showError("Please only upload files that end in types: \n\n" + (fileTypes.join(" .")) + "\n\nPlease select a new file and try again.");
                      
        // alert("Please only upload files that end in types: \n\n" + (fileTypes.join(" .")) + "\n\nPlease select a new file and try again.");
        }

        return myReturn;
    }


    uploadCompanyLogo(){
        let formData: FormData = new FormData();  
        formData.append('file', this.fileToUpload);
        formData.append('CompanyId',this.companyData._id)

        this.apisService.uploadCompanyLogo(formData)
          .subscribe(res=>{
            if(res.success){
              this.toastService.showSuccess(res.message);
            }else{
              this.toastService.showError(res.message);
            }
          });
    }    

    updateCompanyProfile(value:any){
        this.scrollWin();
        if(this.fileToUpload){
          this.uploadCompanyLogo();  
        }
        
        //this.uploadProfilePic(profilePicApi,'photo');
        if(value.Address1 || value.Address2 || value.City){
            if(value.Address1==null){            
              value.Address1=this.addressParts[0];
            }
            if(value.Address2==null){
              value.Address2=this.addressParts[1];
            }

            if(value.City==null){
              value.City=this.addressParts[2];
            }
            this.addressOfCompany=value.Address1+"$$$"+value.Address2+"$$$"+value.City;
        }else{
            this.addressOfCompany=null;
        }

        let form={
            'CompanyName':value.CompanyName || this.companyData.CompanyName,
            'Website':value.Website || this.companyData.Website,
            'ContactNumber':value.ContactNumber || this.companyData.ContactNumber,
            'Country':this.Country || this.companyData.Country,
            'Address' : (this.addressOfCompany==null)?this.companyData.Address:this.addressOfCompany,
            'CompanyId':this.companyData._id,
            'SalesTaxNumber':value.SalesTaxNumber || this.companyData.SalesTaxNumber,
            'RegistrationNumber':value.RegistrationNumber || this.companyData.RegistrationNumber,
            'VATNumber':value.VATNumber || this.companyData.VATNumber
        }
        this.spinnerService.displaySpinner(true);
        this.apisService.editCompanyByTM(form)
          .subscribe(data => {
            if(data.success){
              this.spinnerService.displaySpinner(false);
            this.getUpdatedCompanyData();
              this.toastService.showSuccess(data.message);
                this.goBack();
            }else{
              this.spinnerService.displaySpinner(false);
              this.toastService.showError(data.message);
            }
        });
        this.updateCompanyProfileForm.reset();
    }

    scrollWin() {
        window.scrollTo(0, 0);
    }

    uploadProfilePic(api,type){
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0){ // a file was selected
          this.upload(api,inputEl,type);
        }  
          
    }


    getUpdatedCompanyData(){
        this.spinnerService.displaySpinner(true);
        var agencyId:any={
          AgencyId:this.companyData._id
        }
        this.apisService.getUpdatedTravelAgencyData(agencyId)
          .subscribe(data => {this.companyData=data.data;
            this.spinnerService.displaySpinner(false);
              if(this.companyData.Address){
                this.addressParts =  this.companyData.Address.split("$$$");
              }else{
                this.addressParts=null;
              }
        });
    }
    
/*getUpdatedCompanyData(){
  var agencyId:any={
              AgencyId:this.companyData._id
            }
  this.apisService.getUpdatedTravelAgencyData(agencyId)
          .subscribe(data => {this.companyData=data.data
              if(this.companyData.Address){
              this.addressParts =  this.companyData.Address.split("$$$");
              }
            else
              this.addressParts=null;
    //  this.addressParts.forEach(element => {
    //  });
});
}*/


  ngOnInit() {
    
    

     //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { 

        file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        };
  }
  
}
