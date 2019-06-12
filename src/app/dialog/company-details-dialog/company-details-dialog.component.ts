import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ApisService } from '../../services/apis.service';
import { ToastService } from '../../services/toast.service';

export interface CompanyDetailsModel {
  CompanyTMID:string;
  CompanyName:string;
  CompanyWebsite:string;
  CompanyAddress:string;
  agencyTLList:any;
}

@Component({
  selector: 'company-details-dialog',
  templateUrl: './company-details-dialog.component.html',
  styleUrls: ['./company-details-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyDetailsDialogComponent extends DialogComponent<CompanyDetailsModel, any> implements CompanyDetailsModel{

	CompanyTMID:string;
  CompanyName:string;
	CompanyWebsite:string;
	CompanyAddress:string;
	agencyTLList:any;
	agencyEmployeeList:any;
	AgencyTLId : string;
	EmployeeId : string;

  constructor(dialogService : DialogService,
    public toastService:ToastService,
  	public apisService:ApisService) {
  	super(dialogService);
  }

  getEmployeeOfAgencyByTLId(TLId){
    var sendData = {ReportingManagerId:TLId};
    this.apisService.getEmployeeOfAgencyByTLId(sendData)
      .subscribe(res=>{
        if(res.success){
          if(res.data){
            this.agencyEmployeeList=res.data;
          }else{
            this.agencyEmployeeList=[];
          }
        }else{
          this.toastService.showWarning(res.message);
        }
      });
  }  

	confirm(AgencyTLId,EmployeeId) {
	    // on click on confirm button we set dialog result as true,
	    // ten we can get dialog result from caller code
	    this.result = {AgencyTLId:AgencyTLId,EmployeeId:EmployeeId};
	    this.close();
	}
  
  	cancel() {
	    this.result = false;
	    this.close();
  	}

}
