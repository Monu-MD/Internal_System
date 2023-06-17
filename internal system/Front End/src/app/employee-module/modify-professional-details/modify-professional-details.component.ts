import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modify-professional-details',
  templateUrl: './modify-professional-details.component.html',
  styleUrls: ['./modify-professional-details.component.css']
})
export class ModifyProfessionalDetailsComponent {
  
  employeeName:any;
  modifyProfessionalDetailsForm=new FormGroup<any>({
    employeeName: new FormControl('', [Validators.required])

  })
  onSubmit(item:any){
    console.log(item);
  
  }

  get(){
    return this.onSubmit
  }
}
