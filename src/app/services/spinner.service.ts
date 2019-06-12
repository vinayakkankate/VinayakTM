import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerService {


	// Observable string sources
	private rootComponentDisplaySpinner = new Subject<any>();

	// Observable string streams
	displaySpinner$ = this.rootComponentDisplaySpinner.asObservable();

  constructor() { }

  displaySpinner(value){
	this.rootComponentDisplaySpinner.next(value);    
  }


}
