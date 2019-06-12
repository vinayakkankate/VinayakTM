import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { MappingStatusPipe } from '../../../../pipes/mapping-status.pipe';
import { DialogService } from "ng2-bootstrap-modal";
import { AgencyDetailsDialogComponent } from '../../../../dialog/agency-details-dialog/agency-details-dialog.component'; 
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { AddressSplitPipe} from '../../../../pipes/address-split.pipe';

@Component({
  selector: 'app-corporate-company-mapping',
  templateUrl: './corporate-company-mapping.component.html',
  styleUrls: ['./corporate-company-mapping.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyMappingComponent implements OnInit {

companies : any;
CompanyId : any;
ToCompanyId : any;
ToCompanyTMID : any;
FromCompanyTMID : any=[];
requestData : any;
pendingMappingRequests : any;
approvingMappingRequests : any;
mappedRequests : any;

confirmResult:boolean = null;

  constructor(
    private spinnerService : SpinnerService,
    public apisService:ApisService,
    public toastService:ToastService,
    public authService:AuthService,
    private dialogService:DialogService){
    this.getCompaniesByType(2);
    this.CompanyId = (this.authService.getUserData().CompanyId._id);
    this.getPendingMappingRequestsByFromCompanyId({FromCompanyId:this.CompanyId});
    this.getPendingMappingRequestsByToCompanyId({ToCompanyId:this.CompanyId});
    //this.getMappedRequestsByCompanyId({CompanyId:this.CompanyId,flag:"All"});
    this.getMappedRequestsByCompanyId({CompanyId:this.CompanyId});
  }


  showConfirm(data,flag) {
    this.dialogService.addDialog(AgencyDetailsDialogComponent,
    {
      AgencyAddress:data.Address,
      AgencyTMID:data.TMID,
      AgencyName:data.CompanyName,
      AgencyWebsite:data.Website,
      flag:flag
    }).subscribe((isConfirmed)=>{
        if(isConfirmed){
          console.log(data);
          this.requestData={
            ToCompanyId : data._id,
            FromCompanyId : this.CompanyId,
          }
          this.sendMappingRequest(this.requestData);
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
            console.log(this.companies);
            this.spinnerService.displaySpinner(false);
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

  getPendingMappingRequestsByFromCompanyId(FromCompanyId:any) {
    this.spinnerService.displaySpinner(true);
    this.apisService.getPendingMappingRequestsByFromCompanyId(FromCompanyId)
      .subscribe(res => {
        if(res.success){
          if(res.data){
            this.pendingMappingRequests=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.pendingMappingRequests=[];
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }      
    });
  }

  getPendingMappingRequestsByToCompanyId(ToCompanyId:any) {
    this.spinnerService.displaySpinner(true);
    this.FromCompanyTMID=[];
    this.approvingMappingRequests=[];
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
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }      
    });
  }

  getMappedRequestsByCompanyId(CompanyId:any) {
    this.spinnerService.displaySpinner(true);
    this.apisService.getMappedRequestsByCompanyId(CompanyId)
      .subscribe(res => {
        if(res.success){
          console.log(res);
          if(res.data){
            console.log(res.data);
            this.mappedRequests=res.data;
            this.spinnerService.displaySpinner(false);
          }else{
            this.mappedRequests=[];
            this.spinnerService.displaySpinner(false);
          }
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
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

  getCompanyDetailsByTMID(FromCompanyTMID,ToCompanyTMID,flag){
    console.log(ToCompanyTMID);
    console.log(FromCompanyTMID);
    let travelAgencyID;
    if(ToCompanyTMID !=null && ToCompanyTMID.split('-')[0] == "TMT"){
      travelAgencyID=ToCompanyTMID;
    }
    if(FromCompanyTMID !=null && FromCompanyTMID.split('-')[0] == "TMT"){
      travelAgencyID=FromCompanyTMID;
    }
    this.spinnerService.displaySpinner(true);
    this.apisService.getCompanyDetailsByTMID({TravelAgencyTMID:travelAgencyID})
      .subscribe(res=>{
        if(res.success){  
          this.spinnerService.displaySpinner(false);        
          this.showConfirm(res.data,flag);
        }else{
          this.spinnerService.displaySpinner(false);
          this.toastService.showWarning(res.message);
        }
      });
  }


    approveMappingRequest(FromCompanyTMID,MappingRequestId:any,FromCompanyId:any){
      if(!FromCompanyTMID){
        this.toastService.showWarning("Please Enter TMID");
        return;
      }
      this.spinnerService.displaySpinner(true);
      this.requestData={
        MappingRequestId : MappingRequestId,
        FromCompanyId : FromCompanyId,
        FromCompanyTMID : FromCompanyTMID
      }
      this.apisService.approveMappingRequest(this.requestData)
        .subscribe(res => {
          if(res.success){
            this.spinnerService.displaySpinner(false);
            this.getPendingMappingRequestsByToCompanyId({ToCompanyId:this.CompanyId});
            this.getMappedRequestsByCompanyId({CompanyId:this.CompanyId,flag:"All"});
            this.FromCompanyTMID=[];
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
