import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesRound'
})
export class MinutesRoundPipe implements PipeTransform {

  transform(value: any): any {
  	var Difference="";
	var Day = Math.floor(value/1000/60/60/24);
	if(Day>0){
		Difference=Day+"d ";
		var Hours = Math.floor((value-86400000)/1000/60/60);
		Difference=Difference+Hours+"h ";
	}else{
		var Hours = Math.floor(value/1000/60/60);
		Difference=Hours+"h ";
	}
  	var Minutes = Math.floor((value/1000/60)%60);
  	Difference=Difference+Minutes+"m";
    return Difference;
  }

}
