import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  employeeId:any;
  change=new FormGroup<any>({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword:new FormControl('', [Validators.required]),
    confirmPassword:new FormControl('', [Validators.required])


  })
 submit(item:any){
    console.log(item);
  
  }

  get(){
    return this.submit
  }
}
