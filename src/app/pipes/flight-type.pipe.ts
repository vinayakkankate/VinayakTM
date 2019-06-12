import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightType'
})
export class FlightTypePipe implements PipeTransform {

  transform(value: any): any {
    switch(value) {
      case 1:
      case '1':
          return 'Domestic';
      case 2:
      case '2':
          return 'International';
    }
  }

}
