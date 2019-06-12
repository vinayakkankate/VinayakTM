import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripType'
})
export class TripTypePipe implements PipeTransform {

  transform(value: any): any {
    switch(value) {
      case 1:
      case '1':
          return 'One Way';
      case 2:
      case '2':
          return 'Return';
    }
  }

}
