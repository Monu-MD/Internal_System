import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
constructor(private service:ForgetPasswordService){}
  employeeId: any;
  forgot = new FormGroup<any>({

    employeeId: new FormControl('', [Validators.required]),
    otp: new FormControl('')
  })
  reset(item: any) {
    console.log(item);
    if(item.employeeId!='' && item.otp=='' ){
      console.log("employeeId",item.employeeId);
      this.service.getOTP(item.employeeId)
      
    }
    else if(item.otp!=''  ){
      this.service.verifyOtp(item.otp, item.employeeId)
    }
  }
 

  

}
