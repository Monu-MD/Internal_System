import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class AssetServiceService {


  filteredData: any;
  rowData: any;

  setRowData(value: any) {
    this.rowData = value;
  }

  getRowData() {
    return [this.rowData]
  }

  setFilterData(value: any) {
    this.filteredData = value;
  }
  getData() {
    return [this.filteredData]
  }
  
  FAQ:any
  setFaq(value:any){
  this.FAQ=value
  }

  gettData() {
    return [
      this.FAQ,
    ];
  }
  
  constructor() { }
}
