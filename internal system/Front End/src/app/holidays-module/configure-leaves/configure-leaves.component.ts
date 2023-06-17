import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-configure-leaves',
  templateUrl: './configure-leaves.component.html',
  styleUrls: ['./configure-leaves.component.css']
})
export class ConfigureLeavesComponent {

  leaveForm=new FormGroup<any>({
     leaveType: new FormControl('', [Validators.required]),
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


