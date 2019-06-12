
import { Injectable } from '@angular/core';
import { Http,Headers, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service'
import 'rxjs/Rx' ;



@Injectable()
export class ApisService {

	
//   baseUrl:String='http://www.travelmediary.com';
  //  baseUrl:String ='http://96a2e256.ngrok.io';
  baseUrl:String='http://localhost:4300';
  //baseUrl:String='http://192.168.9.32:4300';
  //baseUrl:String='http://192.168.9.15:4300/api/';
//   baseUrl:String="http://52.172.133.91:6300";
//   baseUrl:String= 'http://355dcc89.ngrok.io'
  // baseUrl:String="http://52.172.133.91:6300";

  NavigationStatus = 0;
  TotalCount:number;
  constructor(private http:Http,
  private authService : AuthService) {

   }



   reportsForExpenses(feed){
      let headers = new Headers();
      headers.append('Authorization',this.authService.getUserToken());
      headers.append('Content-Type','application/json');
      return this.http.post(this.baseUrl+'/api/reportsForExpenses',feed,{headers:headers})
      .map(res=>res.json());
   }
   reportsForOutOfOffice(feed){
      let headers = new Headers();
      headers.append('Authorization',this.authService.getUserToken());
      headers.append('Content-Type','application/json');
      return this.http.post(this.baseUrl+'/api/reportsForOutOfOffice',feed,{headers:headers})
      .map(res=>res.json());
   }
   travelAgentReports(feed){
      let headers = new Headers();
      headers.append('Authorization',this.authService.getUserToken());
      headers.append('Content-Type','application/json');
      return this.http.post(this.baseUrl+'/api/travelAgentReports',feed,{headers:headers})
      .map(res=>res.json());
   }


   checkAuth(){
      let headers = new Headers();
      headers.append('Authorization',this.authService.getUserToken());
      headers.append('Content-Type','application/json');
      this.http.get(this.baseUrl+'/api/authenticate',{headers:headers})
      .subscribe(data=>{
      })
   }

  tmAdminLogin(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/travelMediaryLogin',user,{headers:headers})
      .map(res=>res.json());
  }

  corporateCompanyUserLogin(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/companyLogin',user,{headers:headers})
      .map(res=>res.json());
  }

getUpdatedUserData(feed){
let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getCompanyUserData',feed,{headers:headers})
      .map(res=>res.json());
}
getUpdatedCompanyData(feed){
  let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getCompanyProfile',feed,{headers:headers})
      .map(res=>res.json());
}

getUpdatedTravelAgencyData(feed){
  let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAgencyProfile',feed,{headers:headers}).map(res => res.json());
}

  getUpdatedTravelAgencyUserData(feed){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAgencyUserData',feed,{headers:headers}).map(res => res.json());
  }
  
  travelCompanyUserLogin(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/travelAgentLogin',user,{headers:headers})
      .map(res=>res.json());
  }

  registerCompany(data){
let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/registerCompany', data,{headers:headers}).map(res => res.json());
}

createCompany(data){
let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/createCompany', data,{headers:headers}).map(res => res.json());
}

listofCompanies(){
let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
  return this.http.post(this.baseUrl+'/api/getAllCompanies',null,{headers:headers}).map(res => res.json());

}

editCompanyByTM(data){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
  return this.http.post(this.baseUrl+'/api/editCompanyDetails',data,{headers:headers}).map(res => res.json());
}


 RemoveCompanyByTM(data){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
  return this.http.post(this.baseUrl+'/api/deleteCompany',data,{headers:headers}).map(res => res.json());
}

editUserByTM(data){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
  return this.http.post(this.baseUrl+'/api/editCompanyUserDetails',data,{headers:headers}).map(res => res.json());
}
editTravelUserByTM(data){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
  return this.http.post(this.baseUrl+'/api/editAgencyUserDetails',data,{headers:headers}).map(res => res.json());
}

 RemoveUserByTM(data){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
  return this.http.post(this.baseUrl+'/api/deleteCompanyUser',data,{headers:headers}).map(res => res.json());
}
RemoveTravelUserByTM(userId){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
  return this.http.post(this.baseUrl+'/api/deleteAgencyUser',userId,{headers:headers}).map(res => res.json());
}

getListOfReportingAuthorities(feed){
   let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getTLandAdminListOfCompany',feed,{headers:headers}).map(res => res.json());
}
getListOfTravelReportingAuthorities(feed)
{
  let headers=new Headers();
  headers.append('Authorization',this.authService.getUserToken());
  headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getTLandAdminListOfAgency',feed,{headers:headers}).map(res => res.json());
}
addCompanyMember(feed){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/createCompanyUser',feed,{headers:headers}).map(res => res.json());
}
addAgencyMember(feed){
  let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/createAgencyUser',feed,{headers:headers}).map(res => res.json());
}

addTravelMember(feed)
{
  let headers=new Headers();
  headers.append('Authorization',this.authService.getUserToken());
  headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/createAgencyUser',feed,{headers:headers}).map(res => res.json());  
}
getListOfAllUser(feed){

 let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getTLandEmployeeListOfCompany',feed,{headers:headers}).map(res => res.json());
}
getTeamMembers(feed){

 let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getTeamMemberOfCompany',feed,{headers:headers}).map(res => res.json());
}

getCompanyTeamMembers(feed){

 let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getEmployeeListOfCompany',feed,{headers:headers}).map(res => res.json());
}

getAgencyTeamMembers(feed){

 let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getEmployeeListOfAgency',feed,{headers:headers}).map(res => res.json());
}

getListOfAllTravelUsers(feed){
  let headers=new Headers();
  headers.append('Authorization',this.authService.getUserToken());
  headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getTLandEmployeeListOfAgency',feed,{headers:headers}).map(res => res.json());  
}
getListOfAllTravelTeamMembers(feed){

 let headers = new Headers(feed);
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
return this.http.post(this.baseUrl+'/api/getEmployeeListOfAgency',feed,{headers:headers}).map(res => res.json());
}

updateCorporateUserProfile(data){
  let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/companyUserUpdateProfile',data,{headers:headers})
      .map(res=>res.json());
}
leftUserUpdate(data){
  let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/leftUserUpdate',data,{headers:headers})
      .map(res=>res.json());
}
updateAgencyUserProfile(data){
      let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/editAgencyUserDetails',data,{headers:headers})
      .map(res=>res.json());
}

 changeTravelMediaryUserPassword(user){
     let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/changeTravelMediaryUserPassword',user,{headers:headers})
      .map(res=>res.json());
  }

changeCorporateCompanyUserPassword(user){
    let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/changeCompanyUserPassword',user,{headers:headers})
      .map(res=>res.json());
}
changeTravelCompanyUserPassword(user){
   let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/changeAgencyUserPassword',user,{headers:headers})
      .map(res=>res.json());
}

getCountries(){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllCountries',{headers:headers})
      .map(res=>res.json());
}

getAllAirports(data){
  let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAirportsByCity',data,{headers:headers})
      .map(res=>res.json());
}

createNewRequest(data){
   let headers = new Headers();
    headers.append('Authorization', this.authService.getUserToken());
    headers.append('Content-Type','application/json');
 return this.http.post(this.baseUrl+'/api/createRequest', data,{headers:headers}).map(res => res.json());
}

getPreferredAirlines(){
  let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllAirlines',{headers:headers})
      .map(res=>res.json());
}
getCurrency(){
  let headers = new Headers();      
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllCurrencies',{headers:headers})
      .map(res=>res.json());
}

getIataList(){
  let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getIataList',{headers:headers})
      .map(res=>res.json());
}


getAirportList(){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllAirports',{headers:headers})
      .map(res=>res.json());
}
    
    getAirportListByCountry(feed){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAirportsByCountry',feed,{headers:headers})
      .map(res=>res.json());
}


getRequestsByCompanyUserId1(data) {
      let headers = new Headers();
          headers.append('Authorization',this.authService.getUserToken());
          headers.append('Content-Type','application/json');
          return this.http.post(this.baseUrl+'/api/requestListForCompanyUser',data,{headers:headers})
          .map(res=>res.json());
           
      }
getRequestsByCompanyUserId(data): Promise<any> {
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/requestListForCompanyUser',data,{headers:headers}).toPromise()
    .then(res=>res.json());
     
}



getRequestListForCompanyById(data):Promise<any>{
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/requestListForCompany',data,{headers:headers}).toPromise()
    .then(res=>res.json());
}

getRequestListForAgencyById(data):Promise<any>{
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/requestListForAgency',data,{headers:headers}).toPromise()
      .then(res=>res.json());
}

getRequestsByReportingManagerId(data):Promise<any>{
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/requestListForCompanyReportingManager',data,{headers:headers}).toPromise()
    .then(res=>res.json());
}


getRequestsByAgencyEmployeeId(data):Promise<any>{
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/requestListForAgencyEmployeeById',data,{headers:headers}).toPromise()
      .then(res=>res.json());
}

getRequestDataByRequestId(RequestId){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getRequestData',RequestId,{headers:headers})
      .map(res=>res.json());
}

getCompaniesByType(Type){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getCompanies/'+Type,{headers:headers})
      .map(res=>res.json());
}

sendMappingRequest(RequestData){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/sendMappingRequest',RequestData,{headers:headers})
      .map(res=>res.json());
}


approveMappingRequest(RequestData){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/approveMappingRequest',RequestData,{headers:headers})
      .map(res=>res.json());
}


getPendingMappingRequestsByFromCompanyId(FromCompanyId){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getPendingMappingRequestsByFromCompanyId',FromCompanyId,{headers:headers})
      .map(res=>res.json());
}


getPendingMappingRequestsByToCompanyId(ToCompanyId){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getPendingMappingRequestsByToCompanyId',ToCompanyId,{headers:headers})
      .map(res=>res.json());
}


getMappedRequestsByCompanyId(CompanyId){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getMappedRequestsByCompanyId',CompanyId,{headers:headers})
      .map(res=>res.json());
}


getListOfTLByAgencyId(AgencyId){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getListOfTLByAgencyId',AgencyId,{headers:headers})
      .map(res=>res.json());
}


getEmployeeOfAgencyByTLId(TLId){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getEmployeeListOfAgency',TLId,{headers:headers})
      .map(res=>res.json());
}


updateResponseByRequestId(responseData){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/updateResponseByRequestId',responseData,{headers:headers})
      .map(res=>res.json());
}

updateResponseSelectionByTL(responseData){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/updateResponseSelectionByTL',responseData,{headers:headers})
      .map(res=>res.json());
}


deleteQuoteById(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/deleteQuoteById',data,{headers:headers})
      .map(res=>res.json());
}

updateRequestStatus(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/updateRequestStatus',data,{headers:headers})
      .map(res=>res.json());
}

getCompanyDetailsByTMID(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getCompanyDetailsByTMID',data,{headers:headers})
      .map(res=>res.json());
}

companyUserForgotPassword(data){
let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/companyUserForgotPassword',data,{headers:headers})
      .map(res=>res.json());
}

agencyUserForgotPassword(data){
let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/agencyUserForgotPassword',data,{headers:headers})
      .map(res=>res.json());
}


tmUserForgotPassword(data){
let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/tmUserForgotPassword',data,{headers:headers})
      .map(res=>res.json());
}


getAllCompanyUsersForEmergencyContact(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllCompanyUsersForEmergencyContact',data,{headers:headers})
      .map(res=>res.json());
}

getAllAgencyUsersForEmergencyContact(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllAgencyUsersForEmergencyContact',data,{headers:headers})
      .map(res=>res.json());
}
getAllAgencyUsersProfilepath(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllAgencyUsersProfilepath',data,{headers:headers})
      .map(res=>res.json());
}


getAllAgencyUsers(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAllAgencyUsers',data,{headers:headers})
      .map(res=>res.json());
}

getCountByRequestStatus(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getCountByRequestStatus',data,{headers:headers})
      .map(res=>res.json());
}

getRequestCountByStatusForCompany(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getRequestCountByStatusForCompany',data,{headers:headers})
      .map(res=>res.json());
}
getRequestCountByStatusForAdmin(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getRequestCountByStatusForAdmin',data,{headers:headers})
      .map(res=>res.json());
}

getRequestCountByStatusForAgency(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getRequestCountByStatusForAgency',data,{headers:headers})
      .map(res=>res.json());
}
getRequestCountByStatusandRatingForAgency(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getRequestCountByStatusandRatingForAgency',data,{headers:headers})
      .map(res=>res.json());
}
getTransactionsCountForAgency(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getTransactionsCountForAgency',data,{headers:headers})
      .map(res=>res.json());
}

getMappingCount(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getMappingCount',data,{headers:headers})
      .map(res=>res.json());
}

getCompanyUserCount(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getCompanyUserCount',data,{headers:headers})
      .map(res=>res.json());
}

getAgencyUserCount(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getAgencyUserCount',data,{headers:headers})
      .map(res=>res.json());
}

getRequestCountForAgencyUser(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getRequestCountForAgencyUser',data,{headers:headers})
      .map(res=>res.json());
}

// getRequestCountForCompanyUser(data){
// let headers = new Headers();
//     headers.append('Authorization',this.authService.getUserToken());
//     headers.append('Content-Type','application/json');
//     return this.http.post(this.baseUrl+'/api/getRequestCountForCompanyUser',data,{headers:headers})
//       .map(res=>res.json());
// }

getRequestCountForCompanyUser(){
      let headers = new Headers();
          headers.append('Authorization',this.authService.getUserToken());
          headers.append('Content-Type','application/json');
          return this.http.get(this.baseUrl+'/api/getRequestCountForCompanyUser',{headers:headers})
            .map(res=>res.json());
      }

getCountByCompanyType(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/getCountByCompanyType',data,{headers:headers})
      .map(res=>res.json());
}

companyUserUploadProfilePhoto(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    //headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/companyUserUploadProfilePhoto',data)
      .map(res=>res.json());
}

agencyUserUploadProfilePhoto(data){
let headers = new Headers();
    headers.append('Authorization',this.authService.getUserToken());
    //headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/agencyUserUploadProfilePhoto',data)
      .map(res=>res.json());
}

companyUserUploadPassport(data){
let headers = new Headers();
    //headers.append('Authorization',this.authService.getUserToken());
    //headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/companyUserUploadPassport',data)
      .map(res=>res.json());
}
companyUserFetchPassport(data){
let headers = new Headers();
    //headers.append('Authorization',this.authService.getUserToken());
    headers.append('Content-Type','application/json');
   /*  return this.http.post(this.baseUrl+'/api/companyUserFetchPassport',data)
      .map(res=>res.json()); */
      /* let options={responseType:"blob",headers:headers};
      return this.http.post(this.baseUrl+'/api/companyUserFetchPassport',data)
      .map(res=>res.json()); */
      /* let options={responseType:"blob",headers:headers};
      return this.http.post(this.baseUrl+'/api/companyUserFetchPassport',data)
      .map(res=>res.json()); */
      //{ responseType: ResponseContentType.Blob }
      let options={responseType:ResponseContentType.Blob};
      return this.http.post(this.baseUrl+'/api/companyUserFetchPassport',data,options)
      .map(res=>res.blob());

}

companyUserUploadNationalId(data){
let headers = new Headers();
    /* //headers.append('Authorization',this.authService.getUserToken());
    //headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/companyUserUploadNationalId',data)
      .map(res=>res.json()); */
   // headers.append('Authorization',this.authService.getUserToken());
    //headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/companyUserUploadNationalId',data)
    .map(res=>res.json());
}

updateRequestFeedback(data){
  //headers.append('Authorization',this.authService.getUserToken());
    //headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl+'/api/updateRequestFeedback',data)
    .map(res=>res.json());
}
uploadPurchaseOrder(data){
  //headers.append('Authorization',this.authService.getUserToken());
    //headers.append('Content-Type','application/json');
      return this.http.post(this.baseUrl+'/api/uploadPurchaseOrder',data)
        .map(res=>res.json());
}

uploadCompanyLogo(data){
      let headers = new Headers();
      headers.append('Authorization',this.authService.getUserToken());
      //headers.append('Content-Type','application/json');
      return this.http.post(this.baseUrl+'/api/uploadCompanyLogo',data)
      .map(res=>res.json());
}

changeMappingStatus(RequestData){
      let headers = new Headers();
      headers.append('Authorization',this.authService.getUserToken());
      headers.append('Content-Type','application/json');
      return this.http.post(this.baseUrl+'/api/changeStatusOfMappingRequest',RequestData,{headers:headers})
      .map(res=>res.json());
}

}