import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mappingStatus'
})
export class MappingStatusPipe implements PipeTransform {

  transform(value: boolean): any {
    switch(value) {
      case false:
          return 'Pending';
      case true:
          return 'Confirm';
    }
  }
}
