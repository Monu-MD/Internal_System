
import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-view-it-asset-details',
  templateUrl: './view-it-asset-details.component.html',
  styleUrls: ['./view-it-asset-details.component.css']
})
export class ViewItAssetDetailsComponent {

  
  searchAssetId:any;
  assetData: any;
  asset_id:any
  product:any
  make:any
  serial_no:any
  model:any
  host_name:any
  ip_addr:any
  os:any
  os_type:any
  software:any
  ram:any
  processor:any;
  hard_disk:any
  accessories:any
  window_product_key:any

  constructor(private http: HttpClient,private loginService:LoginServiceService) {
    const assetData=this.loginService.getData();
    console.log(assetData);
    
    const asset=assetData[5]
    console.log(asset,"5555");
    this.asset_id=asset[0].asset_id;
    this.product=asset[0].product;
    this.make=asset[0].make;
    this.serial_no=asset[0].serial_no;
    this.model=asset[0].model;
    this.host_name=asset[0].host_name;
    this.ip_addr=asset[0].ip_addr;
    this.os=asset[0].os;
    this.os_type=asset[0].os_type;
    this.software=asset[0].software;
    this.ram=asset[0].ram;
    this.processor=asset[0].processor;
    this.hard_disk=asset[0].hard_disk;
    this.accessories=asset[0].accessories;
    this.window_product_key=asset[0].window_product_key;

   }

  // search(): void {
  //   this.http.get<any>(`http://localhost:4000/assetDetails/assetViewDetail?assetId=${this.searchAssetId}`).subscribe(
  //     response => {
  //       this.assetData = response.data;
  //     },
  //     error => {
  //       console.log('Error occurred while fetching data:', error);
  //     }
  //   );
  // }





}




























//   constructor(private http: HttpClient,
//     ) { }

//  asset_id: any;
//  product: any;
//  make: any;
//  serial_no: any;
//  model: any;
//  host_name: any;
//  ip_addr: any;
//  os: any;
//  os_type: any;
//  software: any;
//  ram: any;
//  processor: any;
//  hard_disk: any;
//  accessories: any;
//  window_product_key: any;

//  fetchData() {  
//   this.http.get('http://localhost:4000/assetDetails/assetViewDetails')
//     .subscribe(
//       (response: any) => {
//         console.log(response.data);
        
//         if (response.data) {
    
//           this.asset_id =response.data.asset_id;
//           console.log(this.asset_id);
//           this.product =response.data.product;
//           this.make=response.data.make;
//           this.serial_no =response.data.serial_no;
//           this. model=response.data.model;
//           this.host_name=response.data.host_name;
//           this.ip_addr = response.data.ip_addr;
//           this.os =response.data.os;
//           this.os_type=response.data.os_type;
//           this.software =response.data.software;
//           this.software =response.data.software;
//           this.ram =response.data.ram;
//           this.processor =response.data.processor;
//           this. hard_disk =response.data. hard_disk;
//           this.accessories =response.data.accessories;
//           this.window_product_key=response.data.window_product_key;
        
//         } else {
//           // this.router.navigate(['/emppersonal']);
//         }

//         // console.log(this.rowData);
//       },
//       (error: any) => {
//         console.error('Error:', error);
//       }
//     );

//     }

 

//  onSubmit(item:any){
//   console.log(item);
 
// }

//  get() {
//    return this.onSubmit;
//  }
 

