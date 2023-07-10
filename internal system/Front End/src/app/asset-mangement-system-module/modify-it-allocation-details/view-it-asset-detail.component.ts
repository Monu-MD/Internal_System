 
 
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-it-asset-detail',
  templateUrl: './view-it-asset-detail.component.html',
  styleUrls: ['./view-it-asset-detail.component.css']
})
export class ViewItAssetDetailComponent {

    constructor(private http: HttpClient) { }


    ViewItAssetDetailForm:any;
    rowData: any[] = [];
    dataLoaded: boolean = false;
    itemsPerPage: number = 10;
    currentPage: number = 1;
    totalPages: number = 15;
    totalItems: number = 10;
    itemsPerPageOptions: number[] = [10, 25, 50, 100];
  
  
  onItemsPerPageChange(event: any) {
    const value = event.target.value;
    this.itemsPerPage = value;
    this.fetchData();
  
  }
  
  
  ngOnInit() {
  
    this.fetchData();
   
  }
  
  fetchData() {  
    this.http.get('http://localhost:4000/assetDetails/assetViewDetails')
      .subscribe(
        (response: any) => {
          console.log(response.data);
          
          if (response.message=='redirect to viewItAssset') {
            this.rowData = response.data;
            this.dataLoaded = true;
            
          } 
          
          else {
            console.error('Invalid response data');
          }
                 
          console.log(this.rowData);

        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  
      }

    onSubmit(item:any){
      console.log(item);
     this.fetchData();
    }
  
    get(){
      return this.onSubmit
    }
  
  
}





  
  //   ViewItAssetDetailForm:any;
  //   rowData: any[] = [];
  //   filteredData: any[] = [];
  //   dataLoaded: boolean = false;
  //   itemsPerPage: number = 10;
  //   currentPage: number = 1;
  //   totalPages: number = 15;
  //   totalItems: number = 10;
  //   itemsPerPageOptions: number[] = [10, 25, 50, 100];
  
  
  // onItemsPerPageChange(event: any) {
  //   const value = event.target.value;
  //   this.itemsPerPage = value;
  //   // this.filterData(this.viewCommonCodeDetailsForm.value.codeId); 
  //   // this.updatePageData();
  //   this.fetchData();
  // }
  
  
  // ngOnInit() {
  //   this.ViewItAssetDetailForm = new FormGroup({
  //     assetId: new FormControl('', [Validators.required])
  //   });
  
  //   this.fetchData();
  // //  this.updatePageData();
  // }
  
  // fetchData() {  
  //   this.http.get('http://localhost:4000/assetDetails/assetViewDetails')
  //     .subscribe(
  //       (response: any) => {
  //         if (response && response.data && response.data.rows) {
  //           console.log(response.data.rows,"---------------------");
  //           this.rowData = response.data.rows;
  //           console.log(this.rowData);
  //           this.filteredData = this.rowData;
  //           this.dataLoaded = true;
  //           this.updatePageData();
            
  //         }
          
  //         else {
  //           console.error('Invalid response data');
  //         }
  
  //         console.log(this.rowData);
  //       },
  //       (error: any) => {
  //         console.error('Error:', error);
  //       }
  //     );
  // }
  
  // filterData(assetId: string) {
  //   this.filteredData = this.rowData.filter(row =>
  //     row.asset_id.toLowerCase().startsWith(assetId.toLowerCase()))
  //     .slice(0, this.itemsPerPage);
  //      //this.calculateTotalPages();
  //       //  this.updatePageData();
     
  // }
  
  
  
  //   onSubmit() {
  //   if (this.ViewItAssetDetailForm.valid) {
  //     const assetId = this.ViewItAssetDetailForm.value.assetId;
  //     this.filterData(assetId); 
  //   }
  // }
  
  
  // goToFirstPage() {
  //   this.currentPage = 1;
  //    this.updatePageData();
  // }
  
  // goToPreviousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //       this.updatePageData();
  //   }
  // }
  
  // goToNextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //      this.updatePageData();
  //   }
  // }
  
  // goToLastPage() {
  //   this.currentPage = this.totalPages;
  //    this.updatePageData();
  // }
  
  // updatePageData() {
  //   var startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   var endIndex = startIndex + this.itemsPerPage;
  //   this.filteredData = this.rowData.slice(startIndex, endIndex);
  
  // }
  
  // }
  
  



