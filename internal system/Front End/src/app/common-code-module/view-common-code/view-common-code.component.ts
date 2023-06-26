import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CocdService } from 'src/app/services/cocd.service';


@Component({
  selector: 'app-view-common-code',
  templateUrl: './view-common-code.component.html',
  styleUrls: ['./view-common-code.component.css']
})

export class ViewCommonCodeComponent implements OnInit {
  constructor(private http: HttpClient) { }

  viewCommonCodeDetailsForm:any;
  rowData: any[] = [];
  filteredData: any[] = [];
  dataLoaded: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 15;
  totalItems: number = 10;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];


onItemsPerPageChange(event: any) {
  const value = event.target.value;
  this.itemsPerPage = value;
  // this.filterData(this.viewCommonCodeDetailsForm.value.codeId); 
  // this.updatePageData();
  this.fetchData();
}


ngOnInit() {
  this.viewCommonCodeDetailsForm = new FormGroup({
    codeId: new FormControl('', [Validators.required])
  });

  this.fetchData();
//  this.updatePageData();
}

fetchData() {  
  this.http.get('http://localhost:4000/cocd')
    .subscribe(
      (response: any) => {
        if (response && response.data && response.data.rows) {
          this.rowData = response.data.rows;
          this.filteredData = this.rowData;
          this.dataLoaded = true;
          this.updatePageData();
            
          
        } else {
          console.error('Invalid response data');
        }

        console.log(this.rowData);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
}

filterData(codeId: string) {
  this.filteredData = this.rowData.filter(row =>
    row.code_id.toLowerCase().startsWith(codeId.toLowerCase()))
    .slice(0, this.itemsPerPage);
     //this.calculateTotalPages();
      //  this.updatePageData();
   
}



  onSubmit() {
  if (this.viewCommonCodeDetailsForm.valid) {
    const codeId = this.viewCommonCodeDetailsForm.value.codeId;
    this.filterData(codeId);
    
  }
}


goToFirstPage() {
  this.currentPage = 1;
   this.updatePageData();
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

