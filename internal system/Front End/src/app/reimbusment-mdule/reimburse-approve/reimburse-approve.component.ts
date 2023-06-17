import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';

@Component({
  selector: 'app-reimburse-approve',
  templateUrl: './reimburse-approve.component.html',
  styleUrls: ['./reimburse-approve.component.css']
})
export class ReimburseApproveComponent {
 
  MyRequest=new FormGroup<any>({
    employeeId:new FormControl(''),
    employeeName:new FormControl(''),
    ProjectId:new FormControl(''),
    reportingManager:new FormControl(''),
    finanaceManager:new FormControl(''),
    advanceAmount:new FormControl(''),
    claimAmount:new FormControl(''),
    settelmentAmount:new FormControl(''),
    settelmentRemarks:new FormControl(''),
    remarks:new FormControl(''),
    managerRemarks:new FormControl(''),
    finanaceManagerRemarks:new FormControl(''),
    hrRemarks:new FormControl(''),
    settelmentAmount1:new FormControl(''),
    settelmentRemarks1:new FormControl(''),




  })
  My_Request(item:any){
    console.log(item);
    
  }


}
