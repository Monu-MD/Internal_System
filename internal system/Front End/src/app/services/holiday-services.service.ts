import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidayServicesService {

  rowData: any;

  setRowData(value: any) {
    this.rowData = value;
  }

  getRowData() {
    return [this.rowData]
  }

 
  constructor() { }
  
}
