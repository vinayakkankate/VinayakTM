import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transportations'
})
export class TransportationsPipe implements PipeTransform {

	transform(value: any): any {
		switch(value) {
			case 1:
			case '1':
			  	return 'Train';
			case 2:
			case '2':
			  	return 'Bus';
			case 3:
			case '3':
				return 'Cab';
			case 4:
			case '4':
				return 'Metro';
		}
	}
}
