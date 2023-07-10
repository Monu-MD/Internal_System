import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddemployeeserviceService } from 'src/app/services/addemployeeservice.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  userForm!: FormGroup

  constructor(private router: Router,
    private http: HttpClient,
    private service: AddemployeeserviceService,
    private loginservice:LoginServiceService) { }
  output: any;


  ngOnInit(): void {
  }


  employeeId: any;
  register = new FormGroup<any>({
    employeeId: new FormControl('', [Validators.required])

  })
  login(item: any) {
    console.log(item);
    if (item != null) {
      // this.router.navigate(['personalDetails'])
      this.postData(item);

    }

  }
  postData(data: any): void {
    this.http.post('http://localhost:4000/capture/registerEmpId', data).subscribe(
      (response: any) => {
      
        if(response.message=='redirect to personal Details '){
          this.loginservice.cocd=response.cocd;
          this.router.navigate(['/personalDetails'])
          
        }
      
        else if(response.message=='redirect to register '){
          console.log("professional entry");
          this.router.navigate(['/register'])
          
        }

        
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  get() {
    return this.login
  }


}
