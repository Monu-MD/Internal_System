
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import{AssetServiceService} from 'src/app/services/asset-service.service'
@Component({
  selector: 'app-view-it-allocation-deatil',
  templateUrl: './view-it-allocation-deatil.component.html',
  styleUrls: ['./view-it-allocation-deatil.component.css']
})
export class ViewItAllocationDeatilComponent {
 
  constructor(private http: HttpClient, private assetServiceService:AssetServiceService,private loginService:LoginServiceService) {
    const user=this.loginService.getData();
    this.user_type=user[2];
    console.log(this.user_type);
   }
   user_type:any;
  assetData:any;
  ViewItAllocationDetail: any;
  rowData: any[] = [];
  filteredData: any[] = [];
  dataLoaded: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 15;
  totalItems: number = 10;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];
  assetId: any;





  

  onItemsPerPageChange(event: any) {
    const value = event.target.value;
    this.itemsPerPage = value;
    this.fetchData();
  }

  ngOnInit() {
  this. ViewItAllocationDetail = new FormGroup({
    assetId: new FormControl('', [Validators.required])
  });
    this.fetchData();
  }

  fetchData() {
    this.http.get('http://localhost:4000/assetDetails/assetItAllocViewDetails').subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.message == 'redirect to viewItAllocationAsset') {
          this.rowData = response.data;
          this.filteredData = response.data;
          this.dataLoaded = true;
       
        } else {
          console.error('Invalid response data');
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  deleteAsset(row: any) {
    this.http.get(`http://localhost:4000/assetDetails/removeAsset/${row.asset_id}`).subscribe(
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
  

  filterData(assetId: string) {
    this.filteredData = this.rowData.filter( row =>
      row.asset_id && row.asset_id.includes(assetId)
    ).slice(0, this.itemsPerPage);
    console.log('Filtered Data:', this.filteredData);
    this.assetServiceService.setFilterData(this.filteredData);  
  }
  
  
  onSubmit() {
    if (this. ViewItAllocationDetail.valid) {
      const assetId= this. ViewItAllocationDetail.value.assetId;
      this.filterData(assetId);
      
    } 
  }


  modifyAlloc(value:any){

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
