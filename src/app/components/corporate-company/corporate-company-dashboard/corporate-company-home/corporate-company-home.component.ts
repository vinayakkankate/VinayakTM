import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';


@Component({
  selector: 'app-corporate-company-home',
  templateUrl: './corporate-company-home.component.html',
  styleUrls: ['./corporate-company-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateCompanyHomeComponent implements OnInit {

UserData:any;

CompanyId:any;
AllRequestCount:any=0
AllPendingRequestCount : any = 0;
AllConfirmRequestCount : any = 0;
AllInProgressRequestCount : any = 0;
AllProcessedRequestCount : any = 0;
AllHistoryRequestCount : any = 0;
CompanyTLCount:any=0;
CompanyUserCount:any=0;
MappedAgenciesCount:any=0

CompanyUserId:any;
MyRequestCount : any = 0;
MyPendingRequestCount : any = 0;
MyConfirmRequestCount : any = 0;
MyInProgressRequestCount : any = 0;
MyProcessedRequestCount : any = 0;
MyHistoryRequestCount : any = 0;
MyRejectedRequestCount : any = 0;

	  constructor(private spinnerService : SpinnerService,
		public router :Router,
      public authService : AuthService,
      public apisService : ApisService,
      public toastService:ToastService) {

		  this.UserData=authService.getUserData();
		  console.log("userdata in cc home :", this.UserData);
  		this.CompanyId=this.UserData.CompanyId._id;
  		this.CompanyUserId=this.UserData._id;

  		if(this.checkForAdmin()){
  			//this.getRequestCountByStatusForCompany({CompanyId:this.CompanyId,Status:null},(error,count)=>{
  			this.getRequestCountByStatusForAdmin({CompanyId:this.CompanyId,Status:null,ReportingManagerId:this.UserData._id},(error,count)=>{
				this.AllRequestCount=count;
			});

			this.getMappedAgenciesCount({CompanyId:this.CompanyId},(error,count)=>{
				this.MappedAgenciesCount=count;
			});

			// get total no of TL by passing user role
			this.getCompanyUserCount({CompanyId:this.CompanyId,Role:[2]},(error,count)=>{
				this.CompanyTLCount=count;
			});

			// get total no of users by passing user roles
			this.getCompanyUserCount({CompanyId:this.CompanyId,Role:[2,3,4,5]},(error,count)=>{
				this.CompanyUserCount=count;
			});
  		}
  		if(this.checkForMyRequestCount()){
  			// this.getRequestCountForCompanyUser({CompanyUserId:this.CompanyUserId,Status:null},(error,count)=>{
			// 	this.MyRequestCount=count;
			// 	console.log("null :", count)
			// });
  			// this.getRequestCountForCompanyUser({CompanyUserId:this.CompanyUserId,Status:1},(error,count)=>{
			// 	this.MyPendingRequestCount=count;
			// 	console.log("1 :", count)
			// });
			// this.getRequestCountForCompanyUser({CompanyUserId:this.CompanyUserId,Status:2},(error,count)=>{
			// 	this.MyInProgressRequestCount=count;
			// 	console.log("2 :", count)
			// });
			// this.getRequestCountForCompanyUser({CompanyUserId:this.CompanyUserId,Status:3},(error,count)=>{
			// 	this.MyConfirmRequestCount=count;
			// 	console.log("3 :", count)
			// });			
			// this.getRequestCountForCompanyUser({CompanyUserId:this.CompanyUserId,Status:4},(error,count)=>{
			// 	this.MyProcessedRequestCount=count;
			// 	console.log("4 :", count)
			// });
			// this.getRequestCountForCompanyUser({CompanyUserId:this.CompanyUserId,Status:5},(error,count)=>{
			// 	this.MyHistoryRequestCount=count;
			// 	console.log("5 :", count)
			// });

			this.getRequestCountForCompanyUser();
  		}

  		if(this.checkForDelegationAuthority()){
  			this.getRequestCountByStatusForCompany({CompanyId:this.CompanyId,Status:null},(error,count)=>{
				this.AllRequestCount=count;
			});
  			this.getRequestCountByStatusForCompany({CompanyId:this.CompanyId,Status:1},(error,count)=>{
				this.AllPendingRequestCount=count;
			});
			this.getRequestCountByStatusForCompany({CompanyId:this.CompanyId,Status:3},(error,count)=>{
				this.AllConfirmRequestCount=count;
			});
			this.getRequestCountByStatusForCompany({CompanyId:this.CompanyId,Status:2},(error,count)=>{
				this.AllInProgressRequestCount=count;
			});
			this.getRequestCountByStatusForCompany({CompanyId:this.CompanyId,Status:4},(error,count)=>{
				this.AllProcessedRequestCount=count;
			});
			this.getRequestCountByStatusForCompany({CompanyId:this.CompanyId,Status:5},(error,count)=>{
				this.AllHistoryRequestCount=count;
			});
  		}
	 
  	}

  	checkForMyRequestCount(){
  		if(this.UserData.Role==2 || this.UserData.Role==3 || this.UserData.Role==5){
  			return true;
  		}else{
  			return false;
  		} 
  	}

  	checkForAdmin(){
  		if(this.UserData.Role==1){
  			return true;
  		}else{
  			return false;
  		} 
  	}

  	checkForDelegationAuthority(){
  		if(this.UserData.Role==4){
  			return true;
  		}else{
  			return false;
  		} 
  	}
	  
	getRequestCountByStatusForCompany(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getRequestCountByStatusForCompany(data)
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


	getMappedAgenciesCount(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getMappingCount(data)
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
	
	getRequestCountByStatusForAdmin(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getRequestCountByStatusForAdmin(data)
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
	getCompanyUserCount(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getCompanyUserCount(data)
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
	onclick(status){
		// console.log("Click on pending :", status);
		this.authService.setStatusForCC(status);
		this.router.navigate(['/corporate-company/dashboard/my-requests']);
	}
	// getRequestCountForCompanyUser(data,callback){
	// 	this.spinnerService.displaySpinner(true);
	// 	this.apisService.getRequestCountForCompanyUser(data)
	// 		.subscribe(res=>{
	// 			if(res.success){
	// 				if(res.data){
	// 					this.spinnerService.displaySpinner(false);
	// 					callback(null,res.data);
	// 				}else{
	// 					this.spinnerService.displaySpinner(false);
	// 					callback(null,res.data);
	// 				}
	// 			}else{
	// 				this.spinnerService.displaySpinner(false);
	// 				this.toastService.showError(res.message);
	// 				callback(null,res.data);
	// 			}
	// 		});
	// }
	getRequestCountForCompanyUser(){
		this.spinnerService.displaySpinner(true);
		this.apisService.getRequestCountForCompanyUser()
			.subscribe(res=>{
				console.log(res);
				if(res.success){
					console.log("Count responce :", res);
					res.data.forEach(element => {
						if(element.Status == 1)
							this.MyPendingRequestCount = this.MyPendingRequestCount + element.count;
						if(element.Status == 2 || element.Status == 4 || element.Status == 6)
							this.MyRejectedRequestCount = this.MyRejectedRequestCount + element.count;
						if(element.Status == 3 || element.Status == 5 || element.Status == 7)
							this.MyProcessedRequestCount = this.MyProcessedRequestCount + element.count;
						if(element.Status == 8)
							this.MyConfirmRequestCount = this.MyConfirmRequestCount + element.count;
					});
					this.MyRequestCount = this.MyPendingRequestCount + this.MyRejectedRequestCount + this.MyProcessedRequestCount + this.MyConfirmRequestCount;
					this.spinnerService.displaySpinner(false);
				}
				else{
					this.toastService.showError(res.message);
					this.spinnerService.displaySpinner(false);
				}
			}, err =>{
				this.toastService.showError("Check your Internate connection")
				this.spinnerService.displaySpinner(false);
			});
	}

  ngOnInit() {

  }

}
