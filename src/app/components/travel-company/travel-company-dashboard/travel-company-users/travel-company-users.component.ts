import { Component, OnInit} from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Http, RequestOptions, Headers, Response, Request, RequestMethod } from '@angular/http'; 
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-travel-company-users',
  templateUrl: './travel-company-users.component.html',
  styleUrls: ['./travel-company-users.component.css']
})
export class TravelCompanyUsersComponent implements OnInit {
    userData:any;
    user:any
    userlist:Observable<any>;
    userId:any;
    messageForm: FormGroup;
    title:String;
    listOfAuthorities:any;
    popupVisible:boolean;
    showHeaderFilter: boolean;
    //showFilterRow: boolean;
    reportingAuthority:any;
    userType:any;

FirstName:any;
LastName:any;
ContactNumber:any;
Email:any;
Role:any;
ReportingManager:any;
userRoles:any;
reportingManagers:Array<any>;

    constructor(
        private http: Http,public formBuilder:FormBuilder,
        public apisService:ApisService,
        public router:Router,
        public toastService:ToastService,
        public spinnerService : SpinnerService,
        private authService:AuthService) {

        this.userData = this.authService.getUserData();

        this.userRoles=[{value:2,name:"Team Supervisor"},
            {value:3,name:"Team Member"},
            {value:4,name:"Delegation of Authority"}
            ];
            this.getListOfReportingAuthorities();

            this.userType=[
            {"Role":2,"RoleName":"Team Supervisor"},
            {"Role":3,"RoleName":"Team Member"},
            {"Role":4,"RoleName":"Delegation of Authority"}]
            this.showHeaderFilter = true;
            // this.showFilterRow=true;
            this.popupVisible=false;
            this.messageForm=formBuilder.group({
                FirstName: ["", Validators.required],
                LastName: ["", Validators.required],
                MContactNumber: ["", Validators.required],
                Email: ["", Validators.required],
                Role : ["", Validators.required],
                ReportingManagerId:["",Validators.required]
            });
    } 

    onContentReady(e) {
        e.component.columnOption("command:edit", {
            visibleIndex: 0,
            width: 80
        });
    }

    onCellPrepared(e) {
        /* if (e.rowType === "data" && e.column.command === "edit") {
            var isEditing = e.row.isEditing,
            $links = e.cellElement.find(".dx-link");
            $links.text("");
            if (isEditing) {
                $links.filter(".dx-link-save").addClass("dx-icon-save");
                $links.filter(".dx-link-cancel").addClass("dx-icon-revert");
            } 
            else {
                $links.filter(".dx-link-edit").addClass("dx-icon-edit");
                $links.filter(".dx-link-delete").addClass("dx-icon-trash");
            }
        } */
    }
    
    calculateCellValue(data) {
        return [data.Role==2?"Team Supervisor":"Team Member"].join(" ");
    }

    getListOfUser(){
        this.spinnerService.displaySpinner(true);
        var agencyId:any={
            AgencyId:this.userData.AgencyId._id
        }
        this.apisService.getListOfAllTravelUsers(agencyId).subscribe(res => {
            if(res.success){
                if(res.data){
                    this.spinnerService.displaySpinner(false);
                    this.user=res.data;
                    this.updation();
                    this.userlist=this.user;
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

    ngOnInit() {

        this.getListOfUser();
        this.onSelect();
    }

    OpenPopupForSave() {
        this.title="Add User"
        this.popupVisible = true;
    }

    logEventInserting(e){
        e.cancel = true;
    }

    RowRemoving(e){
        this.spinnerService.displaySpinner(true);                    
        var agencyUserId:any={
            AgencyUserId:e.data._id
        }
        this.apisService.RemoveTravelUserByTM(agencyUserId).subscribe(res=>{ 
            if(res.success){
                this.spinnerService.displaySpinner(false);
                this.toastService.showSuccess(res.message);
                this.getListOfUser();
            }
            else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showError(res.message);
                this.getListOfUser();
            }            
        });
    }

    RowUpdated(e){
        console.log(e);
        if(this.userId!=e.data.ReportingManagerId){
            this.spinnerService.displaySpinner(true);
            var messageForm : any = {
                FirstName:e.data.FirstName,
                LastName:e.data.LastName,
                MContactNumber:e.data.MContactNumber,
                ReportingManagerId : e.data.ReportingManagerId,
                Role:e.data.Role,
                AgencyUserId:this.userId,
            } 
            this.apisService.editTravelUserByTM(messageForm).subscribe(res => {
                if(res.success){   
                    this.spinnerService.displaySpinner(false);
                    this.toastService.showSuccess(res.message);
                    this.getListOfUser();
                }
                else{
                    this.spinnerService.displaySpinner(false);
                    this.toastService.showError(res.message);
                    this.getListOfUser();
                }
            });
        }     
        else{
            this.toastService.showError("Team member and Team Supervisor should not be same");
        }
        
        this.onSelect();
    }

    onChange(data){
        this.reportingAuthority=data;
    }

    getListOfReportingAuthorities(){
        this.spinnerService.displaySpinner(true);
        var agencyId:any={
            AgencyId:this.userData.AgencyId._id
        }
        this.apisService.getListOfTravelReportingAuthorities(agencyId).subscribe(res => {
            if(res.success){
                this.spinnerService.displaySpinner(false);
                this.reportingManagers=res.data;
            }else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showSuccess(res.message);
            }            
        });
    }


    onSelect(){
        this.spinnerService.displaySpinner(true);
        var agencyId:any={
            AgencyId:this.userData.AgencyId._id
        }
        this.apisService.getListOfTravelReportingAuthorities(agencyId).subscribe(res => {
            if(res.success){
                this.spinnerService.displaySpinner(false);
                this.listOfAuthorities=res.data;
                this.mergedata();
            }else{
                this.spinnerService.displaySpinner(false);
            }
        });
    }

    updation(){
        for(let a of this.user)
            for(let key in a)
                if(key=='ReportingManagerId')
                    a[key]=a[key]._id;
    }
    
    mergedata(){
        for(let a of this.listOfAuthorities)
            for(let key in a)
                if(key=="LastName")
                    a.FirstName=a.FirstName+" "+a.LastName;
    }  

    EditingStart(e){
        this.userId=e.data._id;
    }

    addUser(addUserResponseForm:any){
        this.spinnerService.displaySpinner(true);
        var newUser={
            FirstName:this.FirstName,
            LastName:this.LastName,
            Email:this.Email,
            AgencyId:this.userData.AgencyId._id,
            MContactNumber : this.ContactNumber,
            Role:this.Role,
            ReportingManagerId:null
        }
        if(this.Role==4){
            newUser.ReportingManagerId = this.userData._id;
        }else{
            newUser.ReportingManagerId=this.ReportingManager;
        }

        this.apisService.addAgencyMember(newUser).subscribe(res => {
            if(res.success){
                this.spinnerService.displaySpinner(false);
                this.toastService.showSuccess(res.message);
                this.getListOfUser();
                this.getListOfReportingAuthorities();
                addUserResponseForm.resetForm();
            }
            else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showError(res.message);
                this.getListOfUser();   
                this.getListOfReportingAuthorities(); 
            }
        });
    }
    
    SaveCompany(){
        this.spinnerService.displaySpinner(true);
        var messageForm : any = {
            FirstName : this.messageForm.value.FirstName,
            LastName : this.messageForm.value.LastName,
            MContactNumber:this.messageForm.value.MContactNumber,
            Email : this.messageForm.value.Email,
            Role : this.messageForm.value.Role,
            ReportingManagerId : this.messageForm.value.ReportingManagerId || this.reportingAuthority || this.userData._id,
            AgencyId:this.userData.AgencyId
        }
        this.apisService.addTravelMember(messageForm).subscribe(res => {
            if(res.success){
                this.spinnerService.displaySpinner(false);
                this.popupVisible = false;
                this.toastService.showSuccess(res.message);
            }
            else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showError(res.message);
            }
            this.getListOfUser();   
        });
        this.messageForm.reset();
        this.popupVisible = false;
    }

    Close(){
        this.messageForm.reset();
        this.popupVisible = false;
    }
}    
