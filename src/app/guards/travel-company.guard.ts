import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'

@Injectable()
export class TravelCompanyGuard implements CanActivate {

	constructor(
		private authService : AuthService,
    private router :Router
	){}

	canActivate(
	    next: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			const userData=this.authService.getUserData();
			if(!userData){
				return false;
			}
			if(userData.Type=="TC"){
				return true;
			}else{
				this.router.navigate(['travel-company/login']);
				return false;
			}
	  	}
}
