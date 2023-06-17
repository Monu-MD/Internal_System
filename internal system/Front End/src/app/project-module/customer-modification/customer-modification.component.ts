import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customer-modification',
  templateUrl: './customer-modification.component.html',
  styleUrls: ['./customer-modification.component.css']
})
export class CustomerModificationComponent {

  coustomerIDSearch =new FormGroup<any>({
    coustomerID:new FormControl('')
  })

  coustomer_ID_Search(cid:any){
    console.log(cid);
    
  }




  coustomerModification=new FormGroup<any>({
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

  coustomer_Modification(item:any){
    console.log(item);
    
  }
}
