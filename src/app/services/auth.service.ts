import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
	authToken:any;
  userData:any;
  companyData:any;
  status:any = "";
  buildVersion:string="1.20.50";
  constructor() { }

  setUserData(userData){
    localStorage.setItem('user',JSON.stringify(userData));
    this.userData = userData;
  }

  setCompanyData(companyData){
    localStorage.setItem('company',JSON.stringify(companyData));
    this.companyData = companyData;
  }

  setUserToken(token){
    localStorage.setItem('token',token);
    this.authToken = token;
  }

  getUserToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;

    return token;
  }

  getUserData(){
    const user = localStorage.getItem('user');
    this.userData = JSON.parse(user);
    return this.userData;
  }

  getCompanyData(){
    const company = localStorage.getItem('company');
    this.companyData = JSON.parse(company);
    return this.companyData;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logoutUser(){
    this.authToken=null;
    this.userData=null;
    localStorage.clear();
  }
  setStatusForCC(status){
      //this.status = status
      localStorage.setItem('status',status);
  }
  getStatusForCC(){    
    var status = localStorage.getItem('status');
    //var status = this.status;
    this.status = "";
    return status;
  }

}
