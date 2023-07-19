import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-child-project',
  templateUrl: './child-project.component.html',
  styleUrls: ['./child-project.component.css']
})
export class ChildProjectComponent {
  notification: any;
  user_id:any;

  constructor(private http: HttpClient, private router: Router,private loginservice:LoginServiceService) {
    this.user_id=this.loginservice.getData()[0];
  }
  // PARENT PROJECT 
  parentProjectId = new FormGroup<any>({

    parentProjectid: new FormControl('', [Validators.required]),

  })

  parent_ProjectId(item: any) {
    console.log(item);

  }


  // child project 

  childProjectId = new FormGroup<any>({
    parentProjectid: new FormControl('', [Validators.required]),
    customerId: new FormControl(''),
    deliveryManager: new FormControl(''),
    paymentType: new FormControl(''),
    customerClass: new FormControl(''),
    projectTeamSize: new FormControl(''),
    projectManager: new FormControl(''),
    projectType: new FormControl(''),
    projectCurrency: new FormControl(''),
    conversationRate: new FormControl(''),
    poNumber: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    remarks: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    countryName: new FormControl(''),
    cityName: new FormControl(''),
    pincode: new FormControl(''),
    projectLocation: new FormControl(''),
    perdiemAmountPerday: new FormControl(''),
    perdiemCurrency: new FormControl(''),
    projectBudget: new FormControl(''),
    targetMarginPercentage: new FormControl(''),
    totalBudget: new FormControl(''),
    salary: new FormControl(''),
    salaryCurrancy: new FormControl(''),
    salaryRate: new FormControl(''),
    salaryConvertedAmmount: new FormControl(''),
    perdiem: new FormControl(''),
    perdiemCurrency2: new FormControl(''),
    perdiemRate: new FormControl(''),
    perdiemConvertedAmmount: new FormControl(''),
    travel: new FormControl(''),
    travelCurrency: new FormControl(''),
    travelRate: new FormControl(''),
    travelConvertedAmmount: new FormControl(''),
    others: new FormControl(''),
    othersCurrency: new FormControl(''),
    otherRate: new FormControl(''),
    otherConvertedAmmount: new FormControl(''),


  })
  fetchData(parpid: any) {
    const params = new HttpParams().set('parpid', parpid.toString())


    this.http.get('http://localhost:4000/projectdetails/fetchDet', { params })
      .subscribe(
        response => {
          console.log(response);
          this.getData(response)


        },
        error => {
          console.error(error);
          alert('Error uploading profile picture.');
        }
      );
  }

  key: any;
  key1: any;
  key2: any;
  key3: any;
  key4: any;
  key5: any;
  key6: any;
  key7: any;
  key8: any;
  key9: any;
  key10: any;
  key11: any;
  key12: any;
  key13: any;
  key14: any;
  key15: any;
  key16: any;
  key17: any;
  key18: any;




  getData(response: any) {
    this.key = response.key
    this.key1 = response.key1
    this.key2 = response.key2
    this.key3 = response.key3
    this.key4 = response.key4
    this.key5 = response.key5
    this.key6 = response.key6
    this.key7 = response.key7
    this.key8 = response.key8
    this.key9 = response.key9
    this.key10 = response.key10
    this.key11 = response.key11
    this.key12 = response.key12
    this.key13 = response.key13
    this.key14 = response.key14
    this.key15 = response.key15
    this.key16 = response.key16
    this.key17 = response.key17
    this.key18 = response.key18



  }

  child_ProjectId(item: any) {
    console.log(item);
    const Item={
      user_id:this.user_id,
      item:item
    }
    this.addchildproject(Item);
  }



  addchildproject(data: any): void {
    this.http.post('http://localhost:4000/projectdetails/addchildproject', data).subscribe(
      (response: any) => {
        console.log(response);

        this.notification = response.notification;

      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
  }


  modifybtn = false;







}
