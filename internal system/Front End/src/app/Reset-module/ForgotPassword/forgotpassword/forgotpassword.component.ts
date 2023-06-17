import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  employeeId: any;
  forgot = new FormGroup<any>({

    employeeId: new FormControl('', [Validators.required]),
    otp: new FormControl('')
  })
  reset(item: any) {
    console.log(item);
  }
  get() {
    return this.reset
  }

}
