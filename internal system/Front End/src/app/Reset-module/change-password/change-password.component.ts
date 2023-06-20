import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private service: ForgetPasswordService) { }
  employeeId: any=this.service.employeeid;
  change = new FormGroup<any>({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])


  })

  submit(item: any) {
    console.log(item);
    const data={
      oldpass:item.currentPassword,
      newpass:item.newPassword,
      conpass:item.confirmPassword,
      empid:this.employeeId
    
    }
    this.service.updatePwd(data)

  }

  get() {
    return this.submit
  }
}
