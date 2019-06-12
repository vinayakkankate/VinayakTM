import { Component, OnInit} from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Http, RequestOptions, Headers, Response, Request, RequestMethod } from '@angular/http'; 
import { AuthService } from '../../../../services/auth.service';
import { ApisService } from '../../../../services/apis.service';
import { ToastService } from '../../../../services/toast.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { SpinnerService } from '../../../../services/spinner.service';


@Component({
  selector: 'app-tm-admin-companies',
  templateUrl: './tm-admin-companies.component.html',
  styleUrls: ['./tm-admin-companies.component.css']
})


export class TmAdminCompaniesComponent implements OnInit {
  CompanyName:any;
 userInfo:Array<Object>;
   companylist: Observable<any>;
myInputVariable: any;
companyId:any;
messageForm: FormGroup;
ContactNumber:any;
addressParts:any
dataService: CompleterData;      
Country:any;
addressOfUser : string;

title:String;
filename:string;
popupVisible = false;
isAdd=false;
showHeaderFilter: boolean;
showFilterRow: boolean;
countryList:Array<Object>;
public edited = false;

  constructor(private http: Http,public formBuilder:FormBuilder,
  public _dataService:ApisService,
  public router:Router,
  public toastService:ToastService,
  public apisService:ApisService,
  private completerService: CompleterService,
 private authService:AuthService) {
   this.addressParts=null;
      this.showHeaderFilter = true;
        this.showFilterRow=true;
        this.apisService.getCountries().subscribe(res => {
      this.countryList=res.data;
       this.dataService = this.completerService.local(this.countryList,'name,city','name').descriptionField('');
       });

      this.messageForm=formBuilder.group({
      CompanyType: ["", Validators.required],
      CompanyName: ["", Validators.required],
      CompanyTmId: [""],
      Address1 : ["", Validators.required],
      Address2 : ["", Validators.required],
      City : ["", Validators.required],
      Country : ["", Validators.required],
      Website : ["", Validators.required],
      Email : ["", Validators.required],
      FirstName : ["", Validators.required],
      LastName : ["", Validators.required],
      CompanyContact : ["", Validators.required],
    });
    
   }

   onContentReady(e) {
         e.component.columnOption("command:edit", {
            visibleIndex: 0,
            width: 80
        });
    }

    public onSelectCountry(selected: CompleterItem){
      if (selected) {
      this.Country = selected.originalObject.name;
      }
    }

    onCellPrepared(e) {
        if (e.rowType === "data" && e.column.command === "edit") {
            var isEditing = e.row.isEditing,
                $links = e.cellElement.find(".dx-link");

            $links.text("");

            if (isEditing) {
                $links.filter(".dx-link-save").addClass("dx-icon-save");
                $links.filter(".dx-link-cancel").addClass("dx-icon-revert");
            } else {
                $links.filter(".dx-link-edit").addClass("dx-icon-edit");
                $links.filter(".dx-link-delete").addClass("dx-icon-trash");
            }
        }
    }


calculateCellValue(data) {
        return [data.CompanyType==1?"Corporate Company":"Travel Company"].join(" ");
    }
  calculateCellValue1(data){
    if(data.Address){
              this.addressParts =  data.Address.split("$$$");
              return [this.addressParts[0]+this.addressParts[1]+this.addressParts[2]].join(" ");
              }
            else{
              this.addressParts=null;
              return['Not Available'].join(" ");
            }
  }    


  listofCompanies(){
  this._dataService.listofCompanies().subscribe(res => {this.companylist=res.data;
 });
}

  ngOnInit() {
  this.listofCompanies();
  }

 OpenPopupForSave() {
this.isAdd=true;
 this.title="Add Company"
this.popupVisible = true;

}
logEventInserting(e)
{
   e.cancel = true;
}
RowRemoving(e)
{
//  debugger; 
var messageForm:any={
    CompanyId:e.data._id
}
 this._dataService.RemoveCompanyByTM(messageForm).subscribe(res=>{ 
     if(res.success){
            this.toastService.showSuccess(res.message);
           } 
          else
          {
            this.toastService.showError(res.message);
          }
          this.listofCompanies();
 });
}

RowUpdated(e){
 var messageForm : any = {
     CompanyType:e.data.CompanyType,
 CompanyName:e.data.CompanyName,
 TMID:e.data.CompanyTMID,
 Address :e.data.Address,
      Website :e.data.Website,
      Email :e.data.Email,
      ContactNumber :e.data.CompanyContact,
      CompanyId:this.companyId
    }
  this._dataService.editCompanyByTM(messageForm).subscribe(res => {
   if(res.success){
        this.toastService.showSuccess(res.message);
   }
             
              //this.popupVisible = false;
          else{
            this.toastService.showError(res.message);
          }
           
            this.listofCompanies();
          
 });
   this.listofCompanies();
}


EditingStart(e){
this.companyId=e.data._id;
this.CompanyName=e.data.CompanyName;
this.ContactNumber=e.data.ContactNumber;
}

SaveCompany()
{
  if(this.messageForm.value.Address1 || this.messageForm.value.Address2 || this.messageForm.value.City)
      {
        // if(this.messageForm.value.Address1==null)
        //   this.messageForm.value.Address1=" ";
        // if(this.messageForm.value.Address2==null)
        //   this.messageForm.value.Address2=" ";
        // if(this.messageForm.value.City==null)
        //   this.messageForm.value.City=" ";
        this.addressOfUser=this.messageForm.value.Address1+"$$$"+this.messageForm.value.Address2+"$$$"+this.messageForm.value.City;
      }
    else
       this.addressOfUser=null;
  if(this.isAdd===true)
  {
     var messageForm : any = {
      CompanyType : this.messageForm.value.CompanyType,
      CompanyName : this.messageForm.value.CompanyName,
      TMID : this.messageForm.value.CompanyTMID,
      Address : this.addressOfUser,
      Country:this.Country,
      Website : this.messageForm.value.Website,
      Email : this.messageForm.value.Email,
      FirstName : this.messageForm.value.FirstName,
      LastName : this.messageForm.value.LastName,
      ContactNumber : this.messageForm.value.CompanyContact,
      
    }

this._dataService.createCompany(messageForm).subscribe(res => {
          if(res.success){
            this.toastService.showSuccess(res.message);
              this.popupVisible = false;
           } 
          else{
           this.toastService.showError(res.message);
          }
            this.listofCompanies();
          });
  }
  
 this.messageForm.reset();
 this.popupVisible = false;
}
Close()
{
   this.messageForm.reset();
  this.popupVisible = false;
  this.isAdd=false;
}
}




