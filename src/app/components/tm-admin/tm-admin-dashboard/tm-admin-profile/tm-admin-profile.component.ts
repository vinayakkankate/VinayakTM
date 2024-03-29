import { Component, OnInit,EventEmitter } from '@angular/core';
// import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { AuthService} from '../../../../services/auth.service';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-tm-admin-profile',
  templateUrl: './tm-admin-profile.component.html',
  styleUrls: ['./tm-admin-profile.component.css']
})
export class TmAdminProfileComponent implements OnInit {
// userData:any;
//   ormData : FormData;
//   files:UploadFile[];
//   uploadInput : EventEmitter<UploadInput>;
//   humanizeBytes:Function;
//   dragOver:boolean;

  constructor( private authService:AuthService){
    // this.files=[];
    // this.uploadInput=new EventEmitter<UploadInput>();
    // this.humanizeBytes = humanizeBytes;
  }

  // onUploadOutput(output: UploadOutput): void {
  //   console.log(output); // lets output to see what's going on in the console

  //   if (output.type === 'allAddedToQueue') { // when all files added in queue
  //     // uncomment this if you want to auto upload files when added
  //     // const event: UploadInput = {
  //     //   type: 'uploadAll',
  //     //   url: '/upload',
  //     //   method: 'POST',
  //     //   data: { foo: 'bar' },
  //     //   concurrency: 0
  //     // };
  //     // this.uploadInput.emit(event);
  //   } else if (output.type === 'addedToQueue') {
  //     this.files.push(output.file); // add file to array when added
  //   } else if (output.type === 'uploading') {
  //     // update current data in files array for uploading file
  //     const index = this.files.findIndex(file => file.id === output.file.id);
  //     this.files[index] = output.file;
  //   } else if (output.type === 'removed') {
  //     // remove file from array when removed
  //     this.files = this.files.filter((file: UploadFile) => file !== output.file);
  //   } else if (output.type === 'dragOver') { // drag over event
  //     this.dragOver = true;
  //   } else if (output.type === 'dragOut') { // drag out event
  //     this.dragOver = false;
  //   } else if (output.type === 'drop') { // on drop event
  //     this.dragOver = false;
  //   }
  // }

  //   mydata:any={
  //       "createdAt": "2017-06-23T11:03:46.367Z",
  //       "CompanyId": "594cf46a8d57e53933331822",
  //       "ReportingManagerId": "594cf46a8d57e53933331823",
  //       "Role": 2,
  //       "Email": "sunitagamne16@gmail.com",
  //       "LastName": "Gamne",
  //       "FirstName": "Gauri",
  //       "updatedAt": "2017-06-26T08:10:59.826Z"
  //   }

  //   startUpload(): void {  // manually start uploading
  //   const event: UploadInput = {
  //     type: 'uploadAll',
  //     url: 'http://winjitstaging.cloudapp.net:4300/api/companyUserUpdateProfile/595382d0f94d152c588c14e0',
  //     method: 'POST',
  //     data: this.mydata,
  //     concurrency: 1 // set sequential uploading of files with concurrency 1
  //   }

  //   this.uploadInput.emit(event);
  // }

  // cancelUpload(id: string): void {
  //   this.uploadInput.emit({ type: 'cancel', id: id });
  // }

  ngOnInit() {
    // this.userData = this.authService.getUserData();
    // console.log(this.userData)
  }

}
