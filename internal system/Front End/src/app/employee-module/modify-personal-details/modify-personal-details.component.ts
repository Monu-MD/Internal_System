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




  // professionalDetailsForm: FormGroup;
  // employees: any[] = [];



  // onsubmit(): void {
  //   const empList = [
  //     {  emp_name: 'John' },
  //     {  emp_name: 'Doe' },
  //     {  emp_name: 'Jane' }
  //   ];

  //   // check if there are records found
  //   if (empList.length > 0) {
  //     this.employees = empList;
  //   } else {
  //     this.employees = [];
  //   }
  // }

  // onSubmit(): void {
  //   // perform form submission
  //   console.log(this.professionalDetailsForm.value);
  // }






  // onsubmit(iteam:any): void {
  //   const empList = [
  //     {  emp_name: 'John' },
  //     {  emp_name: 'Doe' },
  //     {  emp_name: 'Jane' }
  //   ];

  //   // check if there are records found
  //   if (empList.length > 0) {
  //     this.employeeName = iteam.empList;
  //     console.log(iteam.employeeName);
  //   } else {
  //     this.employeeName = [];
  //     console.log(iteam.employeeName)
  //   }
  // }



  // employeeName:any;
  // modifyPersonalDetailsForm=new FormGroup<any>({
  //   employeeName: new FormControl('', [Validators.required])

  // })

  //   onSubmit(iteam:any): void {
  //       if (this.employeeName && iteam.employeeName) {
  //         console.log(iteam.employeeName); 
  //       }
  //        else {
  //         this.employeeName = 'No Records Found';
  //       }
  //     }
    
    
  // get(){
  //   return this.onSubmit
  // }