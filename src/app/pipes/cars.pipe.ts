import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cars'
})
export class CarsPipe implements PipeTransform {

	transform(value: any): any {
		switch(value) {
			case 1:
			case '1':
			  	return 'Sedaan';
			case 2:
			case '2':
			  	return 'SUV';
			case 3:
			case '3':
				return 'Mini';
		}
	}
}
