import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'

@Injectable()
export class TmAdminGuard implements CanActivate {

	constructor(
		private authService : AuthService,
    private router:Router
	){}

	canActivate(
	    next: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			const userData=this.authService.getUserData();
			if(!userData){
				return false;
			}
			if(userData.Type=="TM"){
				return true;
			}else{
					this.router.navigate(['tm-admin/login']);
				return false;
			}
	  	}
}
