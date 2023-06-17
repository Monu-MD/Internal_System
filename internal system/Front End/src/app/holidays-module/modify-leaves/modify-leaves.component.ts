import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modify-leaves',
  templateUrl: './modify-leaves.component.html',
  styleUrls: ['./modify-leaves.component.css']
})
export class ModifyLeavesComponent {

  modifyLeaveForm=new FormGroup<any>({
    leaveType: new FormControl('', [Validators.required]),
    leaveId: new FormControl('',[Validators.required]),
    configYear: new FormControl('', [Validators.required]),
    numDays: new FormControl('', [Validators.required]),
    carryForwardDays: new FormControl('', [Validators.required]),

  }) 
 onSubmit(item:any){
   console.log(item);
 
 }

 get() {
   return this.onSubmit;
 }
}
