import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressSplit'
})
export class AddressSplitPipe implements PipeTransform {

  transform(value: string): any {
    
    var find="$";
    var re=new RegExp(find,'g');
    if(value != "" && value != undefined)
      value=value.split(find).join(" ");

    //value.replace(/$/g,"");
    
    
    return value;
    
  }

}
