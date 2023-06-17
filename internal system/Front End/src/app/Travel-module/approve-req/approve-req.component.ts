import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-approve-req',
  templateUrl: './approve-req.component.html',
  styleUrls: ['./approve-req.component.css']
})
export class ApproveReqComponent {

  approvereq=new FormGroup<any>({
    Requestid: new FormControl(''),
    Employeeid: new FormControl(''),
    Employeename: new FormControl(''),
    Projectid: new FormControl(''),
    FromLocation: new FormControl(''),
    ToLocation: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    avlamt: new FormControl(''),
    Approvername : new FormControl(''),
    approverRemarks: new FormControl(''),
    Employeeremarks: new FormControl(''),
    bookedticketfare: new FormControl(''),
    refundAmount: new FormControl(''),
    payExtraAmount: new FormControl(''),
    amountrefunded: new FormControl(''),
    pnrnumber: new FormControl(''),
    ticketnumber: new FormControl(''),
    financeremarks: new FormControl(''),
    cost: new FormControl(''),
  })

  approve(item:any){
    console.log(item);
  
  }

}
