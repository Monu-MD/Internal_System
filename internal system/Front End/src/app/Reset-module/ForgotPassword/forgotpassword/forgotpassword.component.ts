import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
constructor(private service:ForgetPasswordService,private loginservice:LoginServiceService){}
  employeeId: any;
  forgot = new FormGroup<any>({

    eid: new FormControl('', [Validators.required]),
    otp: new FormControl('')
  })
  reset(item: any) {
    console.log(item);
    if(item.eid!='' && item.otp=='' ){
      console.log("employeeId",item.eid);
      this.loginservice.setData(item)
      this.service.getOTP(item.eid)
      
    }
    else if(item.otp!=''  ){
      this.service.verifyOtp(item.otp, item.eid)
    }
  }
 

  

}
