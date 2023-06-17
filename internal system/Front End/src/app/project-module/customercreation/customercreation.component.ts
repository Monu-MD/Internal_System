import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customercreation',
  templateUrl: './customercreation.component.html',
  styleUrls: ['./customercreation.component.css']
})
export class CustomercreationComponent {


  coustomerDetail=new FormGroup<any>({
    customerName:new FormControl(''),
    customerID:new FormControl(''),
    clientAddressLine1:new FormControl(''),
    clientAddressLine2:new FormControl(''),
    countryName:new FormControl(''),
    cityName:new FormControl(''),
    clientName1:new FormControl(''),
    clientEmialId1:new FormControl(''),
    clinetContactNumber1:new FormControl(''),
    clientName2:new FormControl(''),
    clientEmialId2:new FormControl(''),
    clinetContactNumber2:new FormControl(''),
    GSTNumber:new FormControl(''),
    PANNumber:new FormControl(''),
    remarks:new FormControl(''),
  

  })

  coustomer_Detail(item:any){
    console.log(item);
    
  }
}
