import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-fp',
  templateUrl: './invoice-fp.component.html',
  styleUrls: ['./invoice-fp.component.css']
})
export class InvoiceFPComponent {

  invoice_fp = new FormGroup<any>({
    projectId:new FormControl(''),
    invoiceDate:new FormControl(''),
    billedTo:new FormControl(''),
    invoiceOrderNumber:new FormControl(''),
    milestoneName:new FormControl(''),
    particulars:new FormControl(''),
    SacNumber:new FormControl(''),
    milestonePercentage:new FormControl(''),
    milestoneAmount:new FormControl(''),
    clientGST:new FormControl(''),
    typeoftax:new FormControl(''),
    gstTax:new FormControl(''),
    centralTax:new FormControl(''),
    stateTax:new FormControl(''),
    totalAmountRecievable:new FormControl(''),
    raisedBy:new FormControl(''),
    designation:new FormControl(''),
    GSTIN:new FormControl(''),
    panNo:new FormControl(''),

    
 })
 invoicefp(item:any){
   console.log(item);
 }



}
