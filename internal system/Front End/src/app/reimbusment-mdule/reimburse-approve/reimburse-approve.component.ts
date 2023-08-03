import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReimbursementserviceService } from 'src/app/services/reimbursementservice.service';

@Component({
  selector: 'app-reimburse-approve',
  templateUrl: './reimburse-approve.component.html',
  styleUrls: ['./reimburse-approve.component.css']
})
export class ReimburseApproveComponent {




  constructor(private http:HttpClient,private reimbusmentservice:ReimbursementserviceService,private router:Router){

  }



  MyRequest = new FormGroup<any>({
    ReimbusmentId: new FormControl(''),

  })
  ReimbusmentId: any;
  

  onSubmit(value: any) {
    console.log(value);

    const Item = {
      ReimbusmentId:value.ReimbusmentId
      // user_type: this.user_type
    }
    console.log(Item);
    if (Item != null) {
      this.searchEmpDetails(Item)
    }

  }


  searchEmpDetails(ReimbusmentId: any): void {
    console.log("enter");


    this.http.post('http://localhost:4000/reimbursement/reimburseUserDetails', ReimbusmentId).subscribe(
      (response: any) => {

        this.reimbusmentservice.setremuserdetails(response.reimbusrowData)
        this.router.navigate(['/remuserdetails'])
      },

    );
  }
}
