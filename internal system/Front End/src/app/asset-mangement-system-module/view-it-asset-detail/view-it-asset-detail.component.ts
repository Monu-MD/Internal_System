

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AssetServiceService } from 'src/app/services/asset-service.service';


@Component({
  selector: 'app-view-it-asset-detail',
  templateUrl: './view-it-asset-detail.component.html',
  styleUrls: ['./view-it-asset-detail.component.css']
})
export class ViewItAssetDetailComponent  {


  constructor(private http: HttpClient,private router: Router, private service: AssetServiceService ) { }

  assetData: any;
  viewItAssetForm: any;
  rowData: any[] = [];
  filteredData: any[] = [];
  dataLoaded: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 15;
  totalItems: number = 10;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];


  searchAssetId: any;

  onItemsPerPageChange(event: any) {
    const value = event.target.value;
    this.itemsPerPage = value;
    this.fetchData();
  }

 

  ngOnInit() {
  this.viewItAssetForm = new FormGroup({
    searchAssetId: new FormControl('', [Validators.required])
  });
    this.fetchData();
  }



  fetchData() {
    this.http.get('http://localhost:4000/assetDetails/assetViewDetails').subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.message == 'redirect to viewItAsset') {
          this.rowData = response.data;
          
          this.filteredData = response.data;
          this.dataLoaded = true;
          this.updatePageData();
        } else {
          console.error('Invalid response data');
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }




  filterData(searchAssetId: string) {
    this.filteredData = this.rowData.filter(row =>
      row.asset_id.includes(searchAssetId));
    console.log(this.filteredData,".........");
  }



  deleteAsset(row: any) {
    this.http.get(`http://localhost:4000/assetDetails/assetDelete/${row.asset_id}`).subscribe(
      (response: any) => {
        console.log('Data deleted successfully:', response);
        this.rowData = this.rowData.filter((item) => item.asset_id !== row.asset_id);
        this.filteredData = this.filteredData.filter((item) => item.asset_id !== row.asset_id);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }



filter(value: any) {
  console.log(value,"value");
  this.service.setRowData(value); 
   this.router.navigate(['/ViewItAssetDetails'])
    console.log("-----------------")

  }

    
  onSubmit() {
    if (this.viewItAssetForm.valid) {
      const searchAssetId= this.viewItAssetForm.value.searchAssetId;
      this.filterData(searchAssetId);
        // this.filter();
    } 
  }

  goToFirstPage() {
    if(this.currentPage = 1){
      this.updatePageData();
    }
     
  }
  
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
        this.updatePageData();
    }
  }
  
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
       this.updatePageData();
    }
  }
  
  goToLastPage() {
    this.currentPage = this.totalPages;
     this.updatePageData();
  }
  
  updatePageData() {
    var startIndex = (this.currentPage - 1) * this.itemsPerPage;
    var endIndex = startIndex + this.itemsPerPage;
    this.filteredData = this.rowData.slice(startIndex, endIndex);
  
  }


}


 




  
  



