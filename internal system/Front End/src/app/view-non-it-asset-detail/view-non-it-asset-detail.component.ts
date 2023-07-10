import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-view-non-it-asset-detail',
  templateUrl: './view-non-it-asset-detail.component.html',
  styleUrls: ['./view-non-it-asset-detail.component.css']
})

export class ViewNonItAssetDetailComponent {

  constructor(private http: HttpClient) { }

  assetData:any;
  viewNonItAssetForm: any;
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
  this. viewNonItAssetForm = new FormGroup({
    assetId: new FormControl('', [Validators.required])
  });
    this.fetchData();
  }

  fetchData() {
    this.http.get('http://localhost:4000/assetDetails/assetnItViewDetails').subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.message == 'redirect to viewNonItAsset') {
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


filterData(assetId: string) {
  this.filteredData = this.rowData.filter(row =>
    row.asset_nid && row.asset_nid.includes(assetId)
  ).slice(0, this.itemsPerPage);
  console.log('Filtered Data:', this.filteredData);
}
 
   onSubmit() {
    if (this. viewNonItAssetForm.valid) {
      const assetId= this. viewNonItAssetForm.value.assetId;
      this.filterData(assetId);
      
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
