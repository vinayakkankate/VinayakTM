import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApisService } from '../../../../services/apis.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../services/toast.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-company-home',
  templateUrl: './travel-company-home.component.html',
  styleUrls: ['./travel-company-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TravelCompanyHomeComponent implements OnInit {

UserData:any;

AgencyId:any;
AllRequestCount:any=0
AllPendingRequestCount : any = 0;
AllConfirmRequestCount : any = 0;
AllInProgressRequestCount : any = 0;
AllProcessedRequestCount : any = 0;
AllHistoryRequestCount : any = 0;
AgencyTLCount:any=0;
AgencyUserCount:any=0;
MappedCompaniesCount:any=0

AgencyUserId:any;
MyRequestCount : any = 0;
MyPendingRequestCount : any = 0;
MyConfirmRequestCount : any = 0;
MyInProgressRequestCount : any = 0;
MyProcessedRequestCount : any = 0;
MyHistoryRequestCount : any = 0;
transactionData : any=[];
transactionCount:any=0;
daytransaction_Arr=[];
monthtransaction_Arr=[];
supervisorDaytransaction_Arr=[];
supervisorMonthtransaction_Arr=[];
TodaysAgencyTransactions:any;
AgentprofilepathArr:any=[];
SupervisorprofilepathArr:any=[];
DefaultProfileImage : string = "http://placehold.it/270x263";
currentDate:any=new Date().toDateString().split(' ');

	  constructor(private spinnerService : SpinnerService,
		public router :Router,
      public authService : AuthService,
      public apisService : ApisService,
      public toastService:ToastService) {

		console.log(this.currentDate);
  		this.UserData=authService.getUserData();
  		this.AgencyId=this.UserData.AgencyId._id;
  		this.AgencyUserId=this.UserData._id;

		/** For transactions and rating count **/  
		//this.getTransactionandRatingCount();
		//this.getAgentProfilePath();
		
  		if(this.checkForAdmin()){
  			this.getRequestCountByStatusForAgency({AgencyId:this.AgencyId,Status:null},(error,count)=>{
				this.AllRequestCount=count;
			});
			  
			this.getMappedCompaniesCount({CompanyId:this.AgencyId},(error,count)=>{
				this.MappedCompaniesCount=count;
			});

			// get total no of TL by passing user role
			this.getAgencyUserCount({AgencyId:this.AgencyId,Role:[2]},(error,count)=>{
				this.AgencyTLCount=count;
			});

			// get total no of users by passing user roles
			this.getAgencyUserCount({AgencyId:this.AgencyId,Role:[2,3,4]},(error,count)=>{
				this.AgencyUserCount=count;
			});
  		}
  		if(this.checkForMyRequestCount()){
  			/* this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:null},(error,count)=>{
				this.MyRequestCount += count;
			});
  			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:1},(error,count)=>{
				this.MyPendingRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:2},(error,count)=>{
				this.MyInProgressRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:3},(error,count)=>{
				this.MyConfirmRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:4},(error,count)=>{
				this.MyProcessedRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:5},(error,count)=>{
				this.MyHistoryRequestCount += count;
			}); */

			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:5},(error,count)=>{
				this.MyPendingRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:6},(error,count)=>{
				this.MyInProgressRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:[5,6,7,8,9]},(error,count)=>{
				this.MyRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:8},(error,count)=>{
				this.MyConfirmRequestCount += count;
			});
			this.getRequestCountForAgencyUser({AgencyUserId:this.AgencyUserId,Status:7},(error,count)=>{
				this.MyProcessedRequestCount += count;
			});
  		}

  		if(this.checkForDelegationAuthority()){
  			this.getRequestCountByStatusForAgency({AgencyId:this.AgencyId,Status:null},(error,count)=>{
				this.AllRequestCount=count;
			});
  			this.getRequestCountByStatusForAgency({AgencyId:this.AgencyId,Status:1},(error,count)=>{
				this.AllPendingRequestCount=count;
			});
			this.getRequestCountByStatusForAgency({AgencyId:this.AgencyId,Status:2},(error,count)=>{
				this.AllInProgressRequestCount=count;
			});
			this.getRequestCountByStatusForAgency({AgencyId:this.AgencyId,Status:3},(error,count)=>{
				this.AllConfirmRequestCount=count;
			});
			this.getRequestCountByStatusForAgency({AgencyId:this.AgencyId,Status:4},(error,count)=>{
				this.AllProcessedRequestCount=count;
			});
			this.getRequestCountByStatusForAgency({AgencyId:this.AgencyId,Status:5},(error,count)=>{
				this.AllHistoryRequestCount=count;
			});
  		}
	 
  	}

  	checkForMyRequestCount(){
  		if(this.UserData.Role==3 || this.UserData.Role==2){
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

	getRequestCountByStatusForAgency(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getRequestCountByStatusForAgency(data)
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
	getTransactionsForAgency(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getTransactionsCountForAgency(data)
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
	/* getRequestCountByStatusandRatingForAgency(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getRequestCountByStatusandRatingForAgency(data)
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
	} */

	getMappedCompaniesCount(data,callback){
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

	getAgencyUserCount(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getAgencyUserCount(data)
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

	getRequestCountForAgencyUser(data,callback){
		this.spinnerService.displaySpinner(true);
		this.apisService.getRequestCountForAgencyUser(data)
			.subscribe(res=>{
				if(res.success){
					console.log(res);
					if(res.data){
						console.log(res.data);
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
	/** For transactions and rating count **/  
		this.getTransactionandRatingCount();
		this.getAgentProfilePath();
	
  }

  onclick(status){
	this.authService.setStatusForCC(status);
}

getTransactionandRatingCount(){
	
	this.getTransactionsForAgency({AgencyId:this.AgencyId,Status:null},(error,data)=>{
		console.log(data)
			if(data){
				this.daytransaction_Arr=[];
				this.supervisorDaytransaction_Arr=[];
				this.monthtransaction_Arr=[];
				this.supervisorMonthtransaction_Arr=[];
				/** for day transactions count array **/
				let totaltravelAgencyTransaction = 0;
				let totaltravelAgencyRating = 0;
				for(let i=0;i< data.daytransaction.length ;i++){
					for(let j=0;j< data.daytransaction[i].agents.length;j++){
						let temparr={};
						temparr["supervisor_id"]=data.daytransaction[i]._id;
						temparr["agent_id"]=data.daytransaction[i].agents[j].agent_id;
						temparr["agentTransaction_Count"]=data.daytransaction[i].agents[j].count;
						temparr["rating"]=data.daytransaction[i].agents[j].rating;
						totaltravelAgencyTransaction +=data.daytransaction[i].agents[j].count;
						totaltravelAgencyRating +=data.daytransaction[i].agents[j].rating;
						/* if((this.UserData._id == data.daytransaction[i].agents[j].agent_id && this.UserData.Role != 1 && this.UserData.Role != 2)||  this.UserData.Role == 1){
								this.daytransaction_Arr.push(temparr);
						}
						if((this.UserData._id == data.daytransaction[i].agents[j].agent_id && this.UserData.Role == 2) ||  this.UserData.Role == 1){
							this.daytransaction_Arr.push(temparr); 
						}*/
						if(temparr["supervisor_id"] !=null &&  temparr["agent_id"] != null){
							if((temparr["supervisor_id"] != temparr["agent_id"]) && this.UserData.Role ==1 || (this.UserData._id == temparr["agent_id"] && this.UserData.Role == 3 ))
							{
								this.daytransaction_Arr.push(temparr); 
								this.supervisorDaytransaction_Arr.push({});
							}
							if((temparr["supervisor_id"] == temparr["agent_id"]) && this.UserData.Role ==1 || (this.UserData._id == temparr["agent_id"] && this.UserData.Role == 2 ))
							{
								this.supervisorDaytransaction_Arr.push(temparr); 
								this.daytransaction_Arr.push({});
							}
						}
					}
				}
				this.daytransaction_Arr.map(v => v.totaltravelAgencyTransaction = totaltravelAgencyTransaction);
				this.daytransaction_Arr.map(v => v.totaltravelAgencyRating = totaltravelAgencyRating);
				this.supervisorDaytransaction_Arr.map(v => v.totaltravelAgencyTransaction = totaltravelAgencyTransaction);
				this.supervisorDaytransaction_Arr.map(v => v.totaltravelAgencyRating = totaltravelAgencyRating);
				console.log(this.daytransaction_Arr); 
				console.log(this.supervisorDaytransaction_Arr); 

				/** for month transactions count array**/
				let totaltravelAgencyTransaction1=0;
				let totaltravelAgencyRating1 = 0;
				for(let i=0;i< data.monthtransaction.length ;i++){
					for(let j=0;j< data.monthtransaction[i].agents.length;j++){
						let temparr1={};
						temparr1["supervisor_id"]=data.monthtransaction[i]._id;
						temparr1["agent_id"]=data.monthtransaction[i].agents[j].agent_id;
						temparr1["agentTransaction_Count"]=data.monthtransaction[i].agents[j].count;
						temparr1["rating"]=data.monthtransaction[i].agents[j].rating;
						totaltravelAgencyTransaction1 +=data.monthtransaction[i].agents[j].count;
						totaltravelAgencyRating1 +=data.monthtransaction[i].agents[j].rating;
						/* if((this.UserData._id == data.monthtransaction[i].agents[j].agent_id && this.UserData.Role != 1)||  this.UserData.Role == 1){
							//for(let l=0;l<20;l++){
								this.monthtransaction_Arr.push(temparr1);
							//}
							
						} */
						if(temparr1["supervisor_id"] !=null &&  temparr1["agent_id"] != null){
							if((temparr1["supervisor_id"] != temparr1["agent_id"]) && this.UserData.Role ==1 || (this.UserData._id == temparr1["agent_id"] && this.UserData.Role == 3 ))
							{
								this.monthtransaction_Arr.push(temparr1); 
								this.supervisorMonthtransaction_Arr.push({});
							}
							if((temparr1["supervisor_id"] == temparr1["agent_id"]) && this.UserData.Role ==1 || (this.UserData._id == temparr1["agent_id"] && this.UserData.Role == 2 ))
							{
								this.supervisorMonthtransaction_Arr.push(temparr1); 
								this.monthtransaction_Arr.push({});
							}
						}
					}
				} 
				this.monthtransaction_Arr.map(v => v.totaltravelAgencyTransaction = totaltravelAgencyTransaction1);
				this.monthtransaction_Arr.map(v => v.totaltravelAgencyRating = totaltravelAgencyRating1);
				this.supervisorMonthtransaction_Arr.map(v => v.totaltravelAgencyTransaction = totaltravelAgencyTransaction1);
				this.supervisorMonthtransaction_Arr.map(v => v.totaltravelAgencyRating = totaltravelAgencyRating1);
				console.log(this.monthtransaction_Arr); 
				
				this.transactionData.push(data);
				console.log(this.transactionData);
			}
			if(error){
				this.toastService.showError(error);
			}
	});   
	
}

getAgentProfilePath(){
	this.apisService.getAllAgencyUsersProfilepath({AgencyId:this.AgencyId,Status:null})
		.subscribe(res=>{
			if(res.success){
				this.AgentprofilepathArr=[];
				this.SupervisorprofilepathArr=[];
				console.log(res);
				if(res.data){
					for(let i=0;i<res.data.length;i++){
						if(res.data[i].Role == 3){
							if(this.UserData.Role ==2){
								if(res.data[i].ReportingManagerId == this.UserData._id){
									this.AgentprofilepathArr.push(res.data[i]);
								}
							}else{
								this.AgentprofilepathArr.push(res.data[i]);
							}
							
						}
						if(res.data[i].Role == 2){
							this.SupervisorprofilepathArr.push(res.data[i]);
						}
					}
					console.log(this.AgentprofilepathArr);
					console.log(this.SupervisorprofilepathArr);
					this.spinnerService.displaySpinner(false);
				}else{
					this.AgentprofilepathArr=[];
					this.SupervisorprofilepathArr=[];
					this.spinnerService.displaySpinner(false);
				}
			}else{
				this.AgentprofilepathArr=[];
				this.SupervisorprofilepathArr=[];
				this.spinnerService.displaySpinner(false);
				this.toastService.showError(res.message);
			}
	});
}

getProfilePhoto(data){
 //console.log(data);
	if(data){
	return this.apisService.baseUrl+data;
	}else{
	return this.DefaultProfileImage;
	}
}

gotoReportsPage(e){
	console.log(e);
	this.router.navigate(['travel-company/dashboard/reports']);
}

}
