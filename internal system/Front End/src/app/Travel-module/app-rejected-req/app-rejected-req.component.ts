import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-rejected-req',
  templateUrl: './app-rejected-req.component.html',
  styleUrls: ['./app-rejected-req.component.css']
})
export class AppRejectedReqComponent {

  appRejectedreq=new FormGroup<any>({
    Requestid: new FormControl('', [Validators.required]),
    Employeeid: new FormControl(''),
    Employeename: new FormControl(''),
    Projectid: new FormControl(''),
    FromLocation: new FormControl(''),
    ToLocation: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    Approvername: new FormControl(''),
    Cost : new FormControl(''),
    Managerremarks: new FormControl(''),
    Employeeremarks: new FormControl(''),
    Status: new FormControl('')
  })

  appreject(item:any){
    console.log(item);
  
  }

}
