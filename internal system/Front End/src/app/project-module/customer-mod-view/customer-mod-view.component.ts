import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customer-mod-view',
  templateUrl: './customer-mod-view.component.html',
  styleUrls: ['./customer-mod-view.component.css']
})
export class CustomerModViewComponent implements OnInit {
  cachedData: any;

  constructor() { }


  customerName='';
  customerID: any='MT007';
  clientAddressLine1: any='Davangere';
  clientAddressLine2: any;
  countryName: any;
  cityName: any;
  clientName1: any;
  clientEmialId1: any;
  clinetContactNumber1: any;
  clientName2: any;
  clientEmialId2: any;
  clinetContactNumber2: any;
  GSTNumber: any;
  PANNumber: any;
  remarks: any;




  modfication_details = new FormGroup<any>({

    customerName: new FormControl(''),
    customerID: new FormControl(''),
    clientAddressLine1: new FormControl(''),
    clientAddressLine2: new FormControl(''),
    countryName: new FormControl(''),
    cityName: new FormControl(''),
    clientName1: new FormControl(''),
    clientEmialId1: new FormControl(''),
    clinetContactNumber1: new FormControl(''),
    clientName2: new FormControl(''),
    clientEmialId2: new FormControl(''),
    clinetContactNumber2: new FormControl(''),
    GSTNumber: new FormControl(''),
    PANNumber: new FormControl(''),
    remarks: new FormControl(''),
  })

  modficationDetails(data: any) {
    console.log(data);

  }

  ngOnInit() {
    const cachedData = "";
    if (cachedData) {
      this.cachedData = cachedData;
    } else {
      // fetch data from API or other source
      const data = '';
      // this.cacheService.set('data', data);
      this.cachedData = data;
    }

}}
