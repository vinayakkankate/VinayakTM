import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface AgencyDetailsModel {
  AgencyTMID:string;
  AgencyName:string;
  AgencyWebsite:string;
	AgencyAddress:string;
	flag:string;
}

@Component({
  selector: 'agency-details-dialog',
  templateUrl: './agency-details-dialog.component.html',
  styleUrls: ['./agency-details-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgencyDetailsDialogComponent extends DialogComponent<AgencyDetailsModel, boolean> implements AgencyDetailsModel {

	AgencyTMID:string;
  AgencyName:string;
	AgencyWebsite:string;
	AgencyAddress:string;
	flag:string;

  constructor(dialogService : DialogService) {
  	super(dialogService);
  }

	confirm() {
	    // on click on confirm button we set dialog result as true,
	    // ten we can get dialog result from caller code
	    this.result = true;
	    this.close();
	}
  
  	cancel() {
	    this.result = false;
	    this.close();
  	}


}
