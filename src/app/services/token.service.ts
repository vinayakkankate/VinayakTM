import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenService {

  constructor(private router: Router,
    public authServie: AuthService,
    public toastService: ToastService) { }

  tokenExpired(message){
    this.authServie.logoutUser();
    this.router.navigate(['/corporate-company/login'])
    this.toastService.showWarning(message)
  }

}
