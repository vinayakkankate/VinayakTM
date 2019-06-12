import {ToastOptions} from 'ng2-toastr';

export class ToastCustomOption extends ToastOptions{
	showCloseButton = true;
	positionClass="toast-top-center";
	animate = 'flyRight'; // you can pass any options to override defaults
	newestOnTop = true;
	toastLife=3000;
	dismiss = 'auto';
}
