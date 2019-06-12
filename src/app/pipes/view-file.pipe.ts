import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'viewfile'
})
export class ViewfilePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {}
 
    transform(url: string): any {
        if(!url) return null;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   
    }

}
