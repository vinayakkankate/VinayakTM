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
  selector: 'app-corporate-company-user',
  templateUrl: './corporate-company-user.component.html',
  styleUrls: ['./corporate-company-user.component.css']
})
export class CorporateCompanyUserComponent implements OnInit {
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
  Status:any;

FirstName:any;
LastName:any;
ContactNumber:any;
Email:any;
Role:any;
ReportingManager:any;
userRoles:any;
StartDate:any;
EndDate:any;
currentDateTime:any = new Date();

reportingManagers:Array<any>;
    constructor(
        
        private http: Http,public formBuilder:FormBuilder,
        public apisService:ApisService,
        public router:Router,
        public toastService:ToastService,
        public spinnerService : SpinnerService,
        private authService:AuthService) {

            this.userData = this.authService.getUserData();

            this.userRoles=[{value:2,name:"Team Leader"},
                {value:3,name:"Team Member"},
                {value:4,name:"Delegation of Authority"},
                {value:5,name:"Freelance User"}
                ];

            this.getListOfReportingAuthorities();

            this.userType=[
                {"Role":2,"RoleName":"Team Leader"},
                {"Role":3,"RoleName":"Team Member"},
                {"Role":4,"RoleName":"Delegation of Authority"},
                {"Role":5,"RoleName":"Freelance User"}
            ]

            this.Status=[ 
                {"isDeleted":false,"status":"Active"},
                {"isDeleted":true,"status":"Inactive"}
            ]
            this.showHeaderFilter = true;
            // this.showFilterRow=true;
            this.popupVisible=false;
            this.messageForm=formBuilder.group({
                FirstName: ["", Validators.required],
                LastName: ["", Validators.required],
                Email: ["", Validators.required],
                Role : ["", Validators.required],
                ReportingManagerId:["",Validators.required],
                MContactNumber:["",Validators.required]
            });
        

    } 

    onContentReady(e) {
        e.component.columnOption("command:edit", {
            visibleIndex: 0,
            width: 100
        });
    }

    onCellPrepared(e) {
        //console.log(e);
        /* if (e.rowType === "data" && e.column.command === "edit") {
            var isEditing = e.row.isEditing;
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
        return [data.Role==2?"Team Leader":"Team Member"].join(" ");
    }
    
    getListOfUser(){
        var companyId:any={
            CompanyId:this.userData.CompanyId._id
        }
        this.spinnerService.displaySpinner(true);
        this.apisService.getListOfAllUser(companyId).subscribe(res => {
            if(res.success){
                if(res.data){
                    this.user=res.data
                    this.updation();
                    this.userlist=this.user;     
                    console.log(this.userlist);
                    this.spinnerService.displaySpinner(false);   
                }else{
                    this.spinnerService.displaySpinner(false);   
                    this.toastService.showInfo(res.message);
                }
            }else{
                this.spinnerService.displaySpinner(false);   
                this.toastService.showInfo(res.message);
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
        var messageForm:any={
            CompanyUserId:e.data._id
        }
        this.apisService.RemoveUserByTM(messageForm).subscribe(res=>{ 
            if(res.success){ 
                this.spinnerService.displaySpinner(false);   
                this.toastService.showInfo(res.message);
                this.getListOfUser();
            }else{
                this.spinnerService.displaySpinner(false);   
                this.toastService.showInfo(res.message);
                this.getListOfUser();
            }
        });
    }

    RowUpdated(e){
        console.log(e);
        console.log(e.data.isDeleted);
        /* if(new Date(e.data.Enddate) >= new Date()){
            e.data.isDeleted = false;
        }  */
        if(this.userId!=e.data.ReportingManagerId){
            this.spinnerService.displaySpinner(true);
            var messageForm : any = {
                FirstName:e.data.FirstName,
                LastName:e.data.LastName,
                ReportingManagerId : e.data.ReportingManagerId,
                Role:e.data.Role,
                CompanyUserId:this.userId,
                MContactNumber:e.data.MContactNumber,
                isDeleted:e.data.isDeleted,
                Startdate:e.data.Startdate,
                Enddate:e.data.Enddate
            } 
            this.apisService.editUserByTM(messageForm).subscribe(res => {
                if(res.success){ 
                    this.toastService.showSuccess(res.message); 
                    this.spinnerService.displaySpinner(false);
                    this.getListOfUser();
                }
                else{
                    this.toastService.showError(res.message);
                    this.spinnerService.displaySpinner(false);
                    this.getListOfUser();                    
                }
            });
        }     
        else{
             this.getListOfUser();
             this.toastService.showWarning("Team member and Team Leader should not be same");
        }
       
        this.onSelect();
    }

    onChange(data){
        this.reportingAuthority=data;
    }

    getListOfReportingAuthorities(){
        this.spinnerService.displaySpinner(true);
        var companyId:any={
            CompanyId:this.userData.CompanyId._id
        }
        this.apisService.getListOfReportingAuthorities(companyId).subscribe(res => {
            if(res.success){
                this.spinnerService.displaySpinner(false);
                this.reportingManagers=res.data;
                console.log(this.reportingManagers);
            }else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showSuccess(res.message);
            }            
        });
    }
    onSelect(){
        this.spinnerService.displaySpinner(true);
        var companyId:any={
            CompanyId:this.userData.CompanyId._id
        }
        this.apisService.getListOfReportingAuthorities(companyId).subscribe(res => {
            if(res.success){
                this.spinnerService.displaySpinner(false);
                //this.toastService.showSuccess(res.message);
                this.listOfAuthorities=res.data;
                this.mergedata();
            }else{
                this.spinnerService.displaySpinner(false);
                this.toastService.showSuccess(res.message);
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
            CompanyId:this.userData.CompanyId._id,
            MContactNumber : this.ContactNumber,
            Role:this.Role,
            ReportingManagerId:null,
            Startdate:null,
            Enddate:null
        }
        if(this.Role==4){
            newUser.ReportingManagerId = this.userData._id;
        }else{
            newUser.ReportingManagerId=this.ReportingManager;
        }

        if(this.Role == 5){
            newUser.Startdate=this.StartDate;
            newUser.Enddate=this.EndDate;
        }

        if(this.Role ==2){
            let adminArr=[];
            for (let i=0;i< this.reportingManagers.length;i++){
                if(this.reportingManagers[i].Role == 1){
                    adminArr.push(this.reportingManagers[i]._id);
                }
            }
            newUser.ReportingManagerId=adminArr;
        }
        
        console.log(newUser);
        this.apisService.addCompanyMember(newUser).subscribe(res => {
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
        console.log("in save ");
        this.spinnerService.displaySpinner(true);
        var messageForm : any = {
            FirstName : this.messageForm.value.FirstName,
            LastName : this.messageForm.value.LastName,
            Email : this.messageForm.value.Email,
            Role : this.messageForm.value.Role,
            ReportingManagerId : this.messageForm.value.ReportingManagerId || this.reportingAuthority || this.userData._id,
            CompanyId:this.userData.CompanyId,
            MContactNumber:this.messageForm.value.MContactNumber
           
        }
        this.apisService.addCompanyMember(messageForm).subscribe(res => {
            if(res.success){
                this.spinnerService.displaySpinner(false);
                this.popupVisible = false;
                this.toastService.showSuccess(res.message);
                this.getListOfUser();
            }
            else{
                this.popupVisible = false;
                this.spinnerService.displaySpinner(false);
                this.toastService.showError(res.message);
                this.getListOfUser();    
            }
        });
        this.messageForm.reset();        
    }

    Close(){
        this.messageForm.reset();
        this.popupVisible = false;
    }
}





