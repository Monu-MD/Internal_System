import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent {

  leaveBalanceForm=new FormGroup<any>({
   
    employeeName: new FormControl('', [Validators.required]),
    leaveType:new FormControl('', [Validators.required]),
    availableLeaves:new FormControl('', [Validators.required]),
    quaterlyLeave:new FormControl('', [Validators.required])

 })
 submit(item:any){
    console.log(item);
  }

  get(){
    return this.submit
  }
}
