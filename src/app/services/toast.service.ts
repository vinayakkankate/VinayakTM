import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastService {

  constructor(public toastr: ToastsManager) { }
      showSuccess(message) {
        this.toastr.success(message);
      }
    
      showError(message) {
        this.toastr.error(message);
      }
    
      showWarning(message) {
        this.toastr.warning(message);
      }
    
      showInfo(message) {
        this.toastr.info(message);
      }
      
      showCustom(message) {
        this.toastr.custom('<span style="color: red">'+message+'</span>', null, {enableHTML: true});
      }
}
