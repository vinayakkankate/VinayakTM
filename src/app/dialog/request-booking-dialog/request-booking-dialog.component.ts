import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ApisService } from '../../services/apis.service';
import { ToastService } from '../../services/toast.service';

export interface BookingDetailsModel {
	RequestId:any
}

@Component({
  selector: 'app-request-booking-dialog',
  templateUrl: './request-booking-dialog.component.html',
  styleUrls: ['./request-booking-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestBookingDialogComponent extends DialogComponent<BookingDetailsModel, any> implements BookingDetailsModel{
fileMaxSize:number=1000000;
RequestId:any;
files:any;
  constructor(dialogService : DialogService,
    public toastService:ToastService,
  	public apisService:ApisService) {
  	super(dialogService);
  }

	confirm() {
	    // on click on confirm button we set dialog result as true,
	    // ten we can get dialog result from caller code
	    this.result = this.files;
	    this.close();
	}

  uploadPurchseOrder(event) {
    this.files=null;
    if(event.target.files.length>0){
      if(event.target.files.length>5){
        alert("Max 5 files can be uploaded");
        return;
      }else{
        for(var i=0; i<event.target.files.length;i++){
          if(!this.checkFileMaxSize(event.target.files[i])){
            alert("Max file size is 1MB only");
            return;
          }
          if(!this.checkFileType(event.target.files[i])){
            alert("Select PDF files only");
            return;
          }
        }
        this.files = event.target.files;    
      }      
    }
    
  }

  checkFileMaxSize(file){
      if(file.size<this.fileMaxSize){
        return true;
      }else{
        return false;
      }
    }

    checkFileType(file){
      if(file.type=="application/pdf"){
        return true;
      }else{
        return false;
      }
    }
  
	cancel() {
    this.result = false;
    this.close();
	}

  ngOnInit() {
  }

}
