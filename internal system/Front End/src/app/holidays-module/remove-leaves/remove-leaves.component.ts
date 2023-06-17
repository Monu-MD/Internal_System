import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-remove-leaves',
  templateUrl: './remove-leaves.component.html',
  styleUrls: ['./remove-leaves.component.css']
})
export class RemoveLeavesComponent {

  removeForm=new FormGroup<any>({
    leaveType: new FormControl('', [Validators.required]),
    leaveId: new FormControl('',[Validators.required]),
    configureYear: new FormControl('', [Validators.required]),
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
