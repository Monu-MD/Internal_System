import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetServiceService {

  
  filteredData: any;
  setFilterData(value :any){
    this.filteredData=value;
  }
getData(){
  return[this.filteredData]
}
  constructor() { }
}
