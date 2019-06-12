import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { MappingStatusPipe } from '../../../../pipes/mapping-status.pipe';
import { ToastService } from '../../../../services/toast.service';
import { DialogService } from "ng2-bootstrap-modal";
import { CompanyDetailsDialogComponent } from '../../../../dialog/company-details-dialog/company-details-dialog.component'; 
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-travel-company-mapping',
  templateUrl: './travel-company-mapping.component.html',
  styleUrls: ['./travel-company-mapping.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyMappingComponent implements OnInit {
companies : any;
CompanyId : any;
ToCompanyId : any;
ToCompanyTMID : any;
FromCompanyTMID : any=[];
AgencyTLId : any=[];
EmployeeId : any=[];
requestData : any;
pendingMappingRequests : any;
approvingMappingRequests : any;
mappedRequests : any;
agencyTLList:any;
agencyEmployeeList : any;

  constructor(public apisService:ApisService,
    public authService:AuthService,
    private spinnerService : SpinnerService,
    public toastService:ToastService,
    private dialogService:DialogService){
  	this.getCompaniesByType(1);
    this.CompanyId = (this.authService.getUserData().AgencyId._id);
    this.getPendingMappingRequestsByFromCompanyId({FromCompanyId:this.CompanyId});
    this.getPendingMappingRequestsByToCompanyId({ToCompanyId:this.CompanyId});
    this.getMappedRequestsByCompanyId({CompanyId:this.CompanyId});
    this.getListOfTLByAgencyId({AgencyId:this.CompanyId});
  }

  showConfirm(data,agencyTLList) {
    this.dialogService.addDialog(CompanyDetailsDialogComponent, {
      CompanyAddress:data.Address,
      CompanyTMID:data.TMID,
      CompanyName:data.CompanyName,
      CompanyWebsite:data.Website,
      agencyTLList:agencyTLList})
      .subscribe((result)=>{
        if(result){
          this.requestData={
            ToCompanyId : data._id,
            FromCompanyId : this.CompanyId,
            AgencyReportingManagerId:result.AgencyTLId,
            AgencyEmployeeId:(result.EmployeeId ? result.EmployeeId : result.AgencyTLId)
          }
          this.sendMappingRequest(this.requestData);
        }
    });
  }

  getCompanyDetailsByTMID(ToCompanyTMID){
    console.log(ToCompanyTMID);
    this.spinnerService.displaySpinner(true);
    this.apisService.getCompanyDetailsByTMID({CorporateCompanyTMID:ToCompanyTMID})
      .subscribe(res=>{
        if(res.success){   
          this.spinnerService.displaySpinner(false);
          this.showConfirm(res.data,this.agencyTLList);
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showInfo(res.message);
        }
      });
  }


  getListOfTLByAgencyId(AgencyId){
    this.spinnerService.displaySpinner(true);
    this.apisService.getListOfTLByAgencyId(AgencyId)
      .subscribe(res=>{
        if(res.success){
          if(res.data){
            console.log(res.data);
            this.agencyTLList=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.agencyTLList=[];
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });
  }


  getEmployeeOfAgencyByTLId(TLId){
    this.spinnerService.displaySpinner(true);
    var sendData = {ReportingManagerId:TLId};
    this.apisService.getEmployeeOfAgencyByTLId(sendData)
      .subscribe(res=>{
        if(res.success){
          if(res.data){
            this.agencyEmployeeList=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.agencyEmployeeList=[];
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });
  }


  getCompaniesByType(Type:Number) {
    this.spinnerService.displaySpinner(true);
    this.apisService.getCompaniesByType(Type)
      .subscribe(res => {
        if(res.success){
          if(res.data){
            this.companies=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.companies=[];
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }      
    });
  }

  getPendingMappingRequestsByFromCompanyId(FromCompanyId:any) {
    this.spinnerService.displaySpinner(true);
    this.apisService.getPendingMappingRequestsByFromCompanyId(FromCompanyId)
      .subscribe(res => {
        if(res.success){
          if(res.data){
            this.pendingMappingRequests=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.pendingMappingRequests=[]
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.toastService.showWarning(res.message);
          this.spinnerService.displaySpinner(false);
        }      
    });
  }

  getPendingMappingRequestsByToCompanyId(ToCompanyId:any) {
    this.spinnerService.displaySpinner(true);
    this.apisService.getPendingMappingRequestsByToCompanyId(ToCompanyId)
      .subscribe(res => {
        if(res.success){
          if(res.data){
            this.approvingMappingRequests=res.data;
            console.log(this.approvingMappingRequests);
            this.spinnerService.displaySpinner(false);
          }else{
            this.approvingMappingRequests=[];
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.toastService.showWarning(res.message);
          this.spinnerService.displaySpinner(false);
        }      
    });
  }

  getMappedRequestsByCompanyId(CompanyId:any) {
    this.spinnerService.displaySpinner(true);
    this.apisService.getMappedRequestsByCompanyId(CompanyId)
      .subscribe(res => {
        if(res.success){
          if(res.data){
            console.log(res.data);
            this.mappedRequests=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.mappedRequests=[];
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.toastService.showWarning(res.message);
          this.spinnerService.displaySpinner(false);
        }      
    });
  }

  sendMappingRequest(data){  	
    this.spinnerService.displaySpinner(true);
  	this.apisService.sendMappingRequest(data)
      .subscribe(res => {
      	if(res.success){
          this.spinnerService.displaySpinner(false);
          this.getPendingMappingRequestsByFromCompanyId({FromCompanyId:this.CompanyId});
      		this.ToCompanyId="";
			    this.ToCompanyTMID="";
          this.toastService.showSuccess(res.message);
      	}else{
          this.spinnerService.displaySpinner(false);
      	  this.toastService.showWarning(res.message);
      	}      
    });
  }


    approveMappingRequest(AgencyEmployeeId,AgencyReportingManagerId,FromCompanyTMID:any,MappingRequestId:any,FromCompanyId:any){
    if(!FromCompanyTMID){
      this.toastService.showWarning("Please Enter TMID");
      return;
    }
    /* if(!AgencyReportingManagerId){
      this.toastService.showWarning("Please Select Reporting Manager");
      return;
    }
    if(!AgencyEmployeeId){
      this.toastService.showWarning("Please Select Employee");
      return;
    } */  
    console.log(AgencyEmployeeId);
    if(!AgencyReportingManagerId){
      this.toastService.showWarning("Please Select Reporting Manager");
      return;
    }
    /* if(!AgencyEmployeeId){
      this.toastService.showWarning("Please Select Employee");
      return;
    } */
    if(AgencyEmployeeId == "" || AgencyEmployeeId == undefined){
      AgencyEmployeeId = AgencyReportingManagerId;
    }
    this.spinnerService.displaySpinner(true);
    this.requestData={
      MappingRequestId : MappingRequestId,
      FromCompanyId : FromCompanyId,
      FromCompanyTMID : FromCompanyTMID,
      AgencyReportingManagerId:AgencyReportingManagerId,
      AgencyEmployeeId:AgencyEmployeeId
    }
    this.apisService.approveMappingRequest(this.requestData)
      .subscribe(res => {
        if(res.success){
          this.FromCompanyTMID=[];
          this.spinnerService.displaySpinner(false);
          this.getPendingMappingRequestsByToCompanyId({ToCompanyId:this.CompanyId});
          this.getMappedRequestsByCompanyId({CompanyId:this.CompanyId,flag:"All"});
          this.ToCompanyId="";
          this.ToCompanyTMID="";
          this.toastService.showSuccess(res.message);
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }      
    });
  }

  ngOnInit() {
  }

  changeMappingStatus(status,FromCompanyId,ToCompanyId){
    let params={Status:status,FromCompanyId:FromCompanyId,ToCompanyId:ToCompanyId};
      this.apisService.changeMappingStatus(params)
      .subscribe(res => {
        if(res.success){
          this.spinnerService.displaySpinner(false);
          this.toastService.showSuccess(res.message);
          this.getMappedRequestsByCompanyId({CompanyId:this.CompanyId,flag:"All"});
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      
    });
}

}