import { Pipe, PipeTransform } from '@angular/core';
import { ApisService } from '../services/apis.service';

@Pipe({
  name: 'airportSearch'
})

export class AirportSearchPipe implements PipeTransform {

airportList : any;
airportName : string;

	transform(AirportId: any): any {
		this.airportList.map((airport)=> {
		  if (airport._id === AirportId) {
		    this.airportName = airport.name;		    
		    return;
		  }
		});
		return this.airportName;
	}

	constructor(public apisService:ApisService) {  
       this.getAirportList();
    }
    getAirportList() {
    this.apisService.getAirportList()
      .subscribe(res => {
      this.airportList=res.data;
    });
  }
}
