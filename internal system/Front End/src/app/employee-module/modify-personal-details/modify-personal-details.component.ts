import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-personal-details',
  templateUrl: './modify-personal-details.component.html',
  styleUrls: ['./modify-personal-details.component.css']
})
export class ModifyPersonalDetailsComponent {

 
  // professionalDetailsForm: FormGroup;
  // employees: any[] = [];

  
  employeeName:any;
  modifyPersonalDetailsForm=new FormGroup<any>({
    employeeName: new FormControl('', [Validators.required])

  })
user_type: any;

    onSubmit(iteam:any): void {
        if (this.employeeName && iteam.employeeName) {
          console.log(iteam); 
        }
         else {
          this.employeeName = 'No Records Found';
        }
      }
    
    
  get(){
    return this.onSubmit
  }
}




