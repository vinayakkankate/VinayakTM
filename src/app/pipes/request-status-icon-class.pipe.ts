import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatusIconClass'
})
export class RequestStatusIconClassPipe implements PipeTransform {

  transform(value: any): any {
    switch(value) {
      case 1:
      case '1':
          return 'fa fa-clock-o request-status-icon pending';
      case 2:
      case '2':
          return 'fa fa-refresh request-status-icon in-progress';
      case 3:
      case '3':
          return 'fa fa-thumbs-up request-status-icon processed';
      case 4:
      case '4':
          return 'fa fa-refresh request-status-icon in-progress';
      case 5:
      case '5':
          return 'fa fa-thumbs-up request-status-icon processed';
      case 6:
      case '6':
          return 'fa fa-refresh request-status-icon in-progress';
      case 7:
      case '7':
          return 'fa fa-thumbs-up request-status-icon processed';
      case 8:
      case '8':
          return 'fa fa-check-circle request-status-icon confirmed';
      case 9:
      case '9':
          return 'fa fa-check-circle request-status-icon confirmed';
      
    }
  }


}
