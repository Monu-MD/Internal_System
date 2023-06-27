import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  notification: any;




  constructor(private service: LoginServiceService,
    private router: Router, private http: HttpClient) {
    const user = this.service.getData();
    this.notification = user[3]
  }


  employeeId: any;
  Login = new FormGroup<any>({
    userid: new FormControl(''),
    password: new FormControl('')

  })
  login(item: any) {


    console.log(item);
    if (item.userid != "" || item.password != "") {

      this.loginData(item)
    } else {
      this.notification = "Enter login id or password"
    }

  }

  ///// login api///////////
  loginData(data: any): void {
    this.http.post('http://localhost:4000/login', data).subscribe(
      (response: any) => {
        console.log(response);

        this.notification = response.notification;
        if (response.message == 'redirect to dashboard') {

          if (response.Data[0] != null) {

            this.service.setData(response.Data[0])
          }
          else {
            this.service.setData(response.Data)

          }
          if (response.Data.Emp_Master_Tbl != null) {

            this.service.setEmp_master_Tbl(response.Data.Emp_Master_Tbl)
          }
          else {
            this.service.setEmp_master_Tbl(response.Data)
          }

          this.router.navigate(['/dashboard'])

        }
        else if (response.message == 'redirect to login') {

          this.router.navigate(['/'])

        }
      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
  }



  forgetpas(item: any) {
    console.log("this is ts ", item);

    if (item != null) {
      this.service.forget(item)
    }
    else {
      alert("enter user id")
    }
  }
}