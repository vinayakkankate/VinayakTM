import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatusText'
})
export class RequestStatusTextPipe implements PipeTransform {

  transform(value: any): any {
    switch(value) {
      case 1:
      case '1':
          return 'Pending';
      case 2:
      case '2':
          return 'Rejected';
      case 3:
      case '3':
          return 'Processed';
      case 4:
      case '4':
          return 'Rejected';
      case 5:
      case '5':
          return 'Processed';
      case 6:
      case '6':
          return 'Rejected';
      case 7:
      case '7':
          return 'Processed';
      case 8:
      case '8':
          return 'Confirmed';
    }
  }

}
