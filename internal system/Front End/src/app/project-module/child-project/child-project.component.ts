import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';

@Component({
  selector: 'app-child-project',
  templateUrl: './child-project.component.html',
  styleUrls: ['./child-project.component.css']
})
export class ChildProjectComponent {

  // PARENT PROJECT 
parentProjectId = new FormGroup<any>({

  parentProjectid: new FormControl('', [Validators.required]),

  })

  parent_ProjectId(item:any){
    console.log(item);
    
  }


  // child project 

  childProjectId =new FormGroup<any>({
    customerId:new FormControl(''),
    deliveryManager:new FormControl(''),
    paymentType:new FormControl(''),
    customerClass:new FormControl(''),
    projectTeamSize:new FormControl(''),
    projectManager:new FormControl(''),
    projectType:new FormControl(''),
    projectCurrency:new FormControl(''),
    conversationRate:new FormControl(''),
    poNumber:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),
    remarks:new FormControl(''),
    addressLine1:new FormControl(''),
    addressLine2:new FormControl(''),
    countryName:new FormControl(''),
    cityName:new FormControl(''),
    pincode:new FormControl(''),
    projectLocation:new FormControl(''),
    perdiemAmountPerday:new FormControl(''),
    perdiemCurrency:new FormControl(''),
    projectBudget:new FormControl(''),
    targetMarginPercentage:new FormControl(''),
    totalBudget:new FormControl(''),
    salary:new FormControl(''),
    salaryCurrancy:new FormControl(''),
    salaryRate:new FormControl(''),
    salaryConvertedAmmount:new FormControl(''),
    perdiem:new FormControl(''),
    perdiemCurrency2:new FormControl(''),
    perdiemRate:new FormControl(''),
    perdiemConvertedAmmount:new FormControl(''),
    travel:new FormControl(''),
    travelCurrency:new FormControl(''),
    travelRate:new FormControl(''),
    travelConvertedAmmount:new FormControl(''),
    others:new FormControl(''),
    othersCurrency:new FormControl(''),
    otherRate:new FormControl(''),
    otherConvertedAmmount:new FormControl(''),  
    

  })

  child_ProjectId(item:any){
    console.log(item);
    
  }

  modifybtn=false;

}
