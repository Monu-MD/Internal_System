import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  notification: any;
  constructor(private service: LoginServiceService,
    private router: Router) {

  }


  employeeId: any;
  Login = new FormGroup<any>({
    userid: new FormControl(''),
    password: new FormControl('')

  })
  login(item: any) {
    console.log(item);
    this.service.login(item)


  }

}
