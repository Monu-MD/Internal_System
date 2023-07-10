import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-view-non-it-asset-details',
  templateUrl: './view-non-it-asset-details.component.html',
  styleUrls: ['./view-non-it-asset-details.component.css']
})
export class ViewNonItAssetDetailsComponent {


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
   
}
