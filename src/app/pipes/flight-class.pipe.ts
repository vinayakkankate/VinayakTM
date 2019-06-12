import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightClass'
})
export class FlightClassPipe implements PipeTransform {

	transform(value: any): any {
		switch(value) {
			case 1:
			case '1':
			  	return 'Economy Class';
			case 2:
			case '2':
			  	return 'Premium Economy Class';
			case 3:
			case '3':
				return 'First Class';
			case 4:
			case '4':
				return 'Business Class';
		}
	}
}
