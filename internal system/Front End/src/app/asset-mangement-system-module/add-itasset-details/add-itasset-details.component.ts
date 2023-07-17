import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-add-itasset-details',
  templateUrl: './add-itasset-details.component.html',
  styleUrls: ['./add-itasset-details.component.css']
})
export class AddITAssetDetailsComponent {


  constructor(private http: HttpClient, private router: Router) { }

  addItAssetDetailsForm = new FormGroup<any>({
    asset_id: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    make: new FormControl('', [Validators.required]),
    serial_no: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    host_name: new FormControl('', [Validators.required]),
    ip_addr: new FormControl('', [Validators.required]),
    os: new FormControl('', [Validators.required]),
    os_type: new FormControl('', [Validators.required]),
    software: new FormControl('', [Validators.required]),
    ram: new FormControl('', [Validators.required]),
    processor: new FormControl('', [Validators.required]),
    hard_disk: new FormControl('', [Validators.required]),
    accessories: new FormControl('', [Validators.required]),
    window_product_key: new FormControl('', [Validators.required])
  })


  postData(item: any) {
    const postData = {
      asset_id: item.asset_id,
      product: item.product,
      make: item.make,
      serial_no: item.serial_no,
      model: item.model,
      host_name: item.host_name,
      ip_addr: item.ip_addr,
      os: item.os,
      os_type: item.os_type,
      software: item.software,
      ram: item.ram,
      processor: item.processor,
      hard_disk: item.hard_disk,
      accessories: item.accessories,
      window_product_key: item.window_product_key

    };

    this.http.post('http://localhost:4000/assetDetails/additasset', postData)
      .subscribe(
        (response: any) => {

          console.log("enterd");
          console.log('Data posted successfully:', response);

          if(response.message == "redirect to view page"){
            this.router.navigateByUrl("/ViewItAssetDetail")
          }

        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  onSubmit(item: any) {
    console.log(item);
    this.postData(item);
  }

  get() {
    return this.onSubmit;
  }
}
