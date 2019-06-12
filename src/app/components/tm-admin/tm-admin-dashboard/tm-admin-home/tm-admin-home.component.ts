import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-tm-admin-home',
  templateUrl: './tm-admin-home.component.html',
  styleUrls: ['./tm-admin-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TmAdminHomeComponent implements OnInit {

TotalCompanies:any=0;
TotalAgencies:any=0;
TotalRequests:any=0;
TotalBookings:any=0;

	constructor(private spinnerService : SpinnerService,
      public authService : AuthService,
      public apisService : ApisService,
      public toastService:ToastService) {

		this.getCountByRequestStatus({Status:null},(error,count)=>{
			this.TotalRequests=count;
		});
		this.getCountByRequestStatus({Status:4},(error,count)=>{
			this.TotalBookings=count;
		});

      	this.getCountByCompanyType({CompanyType:2},(error,count)=>{
			this.TotalAgencies=count;
		});
      	this.getCountByCompanyType({CompanyType:1},(error,count)=>{
			this.TotalCompanies=count;
		});
	}

	getCountByRequestStatus(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getCountByRequestStatus(data)
			.subscribe(res=>{
				if(res.success){
					if(res.data){
						this.spinnerService.displaySpinner(false);
						callback(null,res.data);
					}else{
						this.spinnerService.displaySpinner(false);
						callback(null,res.data);
					}
				}else{
					this.spinnerService.displaySpinner(false);
					this.toastService.showError(res.message);
					callback(null,res.data);
				}
			});
	}


	getCountByCompanyType(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getCountByCompanyType(data)
			.subscribe(res=>{
				if(res.success){
					if(res.data){
						this.spinnerService.displaySpinner(false);
						callback(null,res.data);
					}else{
						this.spinnerService.displaySpinner(false);
						callback(null,res.data);
					}
				}else{
					this.spinnerService.displaySpinner(false);
					this.toastService.showError(res.message);
					callback(null,res.data);
				}
			});
	}

  ngOnInit() {
  }

}
