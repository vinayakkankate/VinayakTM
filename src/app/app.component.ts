import { LandingPageComponent} from './components/landing-page/landing-page.component';
import { Component,ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  	public spinner:boolean=false;
	
	constructor(
		public toastr: ToastsManager,
		vcr: ViewContainerRef,
		public spinnerService:SpinnerService
		){
	        
	    	this.toastr.setRootViewContainerRef(vcr);
	    	this.spinnerService.displaySpinner$.subscribe((value)=>{
		        this.spinner = value;
		    });
	    }
}