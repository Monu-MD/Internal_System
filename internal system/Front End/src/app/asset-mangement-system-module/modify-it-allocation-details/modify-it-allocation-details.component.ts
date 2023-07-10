import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import{AssetServiceService} from 'src/app/services/asset-service.service'
@Component({
  selector: 'app-modify-it-allocation-details',
  templateUrl: './modify-it-allocation-details.component.html',
  styleUrls: ['./modify-it-allocation-details.component.css']
})
export class ModifyItAllocationDetailsComponent {
  
  constructor(private http: HttpClient, private assetServiceService:AssetServiceService
    ) { }
    filteredData: any[] = [];
   

    ngOnInit() {
      this.filteredData = this.assetServiceService.getData();
      console.log('Filtered Data----->:', this.filteredData);
    }
  modifyItAssetAllocationForm=new FormGroup<any>({
    asset_id: new FormControl('', [Validators.required]),
    empId:new FormControl('',[Validators.required]),
    emp_name:new FormControl('', [Validators.required]),
    allocdate:new FormControl('', [Validators.required]),
    rdate:new FormControl('', [Validators.required])
 })


updateData(item: any) {
const updateData = {
  asset_id:item.asset_id,
  empId: item.empId,
  emp_name: item.emp_name,
  allocdate: item.allocdate,
  rdate:item.rdate
};

this.http.post('http://localhost:4000/assetDetails/assetmodAlloc', updateData)
.subscribe(
(response: any) => {

console.log("enterd");

  console.log('Data upadated successfully:', response);
 

},
(error: any) => {
  console.error('Error:', error);
}
);
}

onSubmit(item:any){
console.log(item);
this.updateData(item);
}

get() {
return this.onSubmit;
}
}
