import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatusTextClass'
})
export class RequestStatusTextClassPipe implements PipeTransform {

  transform(value: any): any {
    switch(value) {
      case 1:
      case '1':
          return 'request-status-text pending';
      case 2:
      case '2':
          return 'request-status-text in-progress';
      case 3:
      case '3':
          return 'request-status-text processed';
      case 4:
      case '4':
          return 'request-status-text in-progress';
      case 5:
      case '5':
          return 'request-status-text processed';
      case 6:
      case '6':
          return 'request-status-text in-progress';
      case 7:
      case '7':
          return 'request-status-text processed';
      case 8:
      case '8':
          return 'request-status-text confirmed';
      case 9:
      case '9':
          return 'request-status-text confirmed';
    }
  } 


}
