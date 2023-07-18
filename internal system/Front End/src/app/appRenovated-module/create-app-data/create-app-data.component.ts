import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-app-data',
  templateUrl: './create-app-data.component.html',
  styleUrls: ['./create-app-data.component.css']
})
export class CreateAppDataComponent {

  notification: any;
  service: any;

  constructor(private router: Router, private http: HttpClient) { }
  employeeName = '';

  ctrapp = new FormGroup<any>({

    employeeName: new FormControl(''),
    employeeName1: new FormControl(''),

  })



  createApp(item: any) {
    console.log(item);
  }


  register = new FormGroup<any>({
    employeeName: new FormControl('',),
    employeeName1: new FormControl('')

  })
  pkpi = [
    { Indicator: 'No Record Found', Weightage: 'No Record Found', Role: 'No Record Found' },
  ];

  bkpi = [
    { Indicator: 'No Record Found', Weightage: 'No Record Found', Role: 'No Record Found' },
  ];
  itemsPerPage = 10;
  currentPage = 1;
  totalItems = this.pkpi.length;

  totalItems2 = this.bkpi.length;
  PerPage: number = 100;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];
  onItemsPerPageChange(): void {
    this.currentPage = 1;

  }
  projectViewData: any;
  projectview(data: any): void {
    console.log(data);
    const pid = {
      pid: data
    }
    this.http.post('http://localhost:4000/projectModule/childproject/viewAllocation', pid).subscribe(
      (response: any) => {
        console.log(response);

        this.notification = response.notification;
        this.projectViewData = response.data;


      }



    );
  }



}
