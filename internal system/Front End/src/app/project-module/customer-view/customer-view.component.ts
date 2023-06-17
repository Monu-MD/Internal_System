import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent {
  customerName='Yash';
  customerID=1234;
  clientAddressLine1='abc';
  clientAddressLine2='efg';
  countryName='India'
  cityName='Banglore'
  clientName1='1'
  clientEmialId1='1@id'
  clinetContactNumber1=1233
  clientName2='yashu p'
  clientEmialId2='po@gmail.com'
  clinetContactNumber2=3454
  GSTNumber='lksdkf334'
  PANNumber='3423432'
  remarks='very bad'
}
