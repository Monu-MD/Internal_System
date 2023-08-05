import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HolidayServicesService } from 'src/app/services/holiday-services.service';

@Component({
  selector: 'app-list-of-leaves',
  templateUrl: './list-of-leaves.component.html',
  styleUrls: ['./list-of-leaves.component.css']
})
export class ListOfLeavesComponent {

  constructor(private http: HttpClient , private router:Router ,private service:HolidayServicesService) { }

  viewLeaveForm:any;
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
  this.http.get('http://localhost:4000/holiday/ViewConfigureLeavesPage')
    .subscribe(
      (response: any) => {
        console.log(response.data);
        
        if (response.message=='redirect to viewHolidays') {
          this.rowData = response.data;
          this.dataLoaded = true;
          this.updatePageData();


          if (response.data && response.data.rows && Array.isArray(response.data.rows)) {
            // Loop through the response data and map it to the desired format
            for (const item of response.data.rows) {
              if (item.leave_type === 'annual') {
                this.rowData.push({ type: 'EL', value: item.value });
              } else if (item.leave_type === 'sick') {
                this.rowData.push({ type: 'SL', value: item.value });
              }
            }
          }
          
          else {
            console.error('Invalid response data format');
          }
      
      }
        else {
          console.error('Invalid response data');
        }

        // console.log(this.rowData);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );

    }


deleteHoliday(row: any) {
  this.http.get(`http://localhost:4000/holiday/removeLeavePage/${row.leave_id}`).subscribe(
    (response: any) => {
              console.log('Data deleted successfully:', response);
               // Remove the deleted item from rowData array it will reloaded 
              this.rowData = this.rowData.filter(item => item.leave_id !== row.leave_id);
            },
            (error: any) => {
              console.error('Error:', error);
            }  
  );
 
  }

  modifyHoliday(value:any){


    console.log(value,"value");
    this.service.setRowData(value); 
     this.router.navigate(['/modifyLeave']);
      console.log("-----------------")

    
    
  }

  onSubmit(item:any){
    console.log(item);
     this.deleteHoliday(item);
  }

  get(){
    return this.onSubmit
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
  this.rowData= this.rowData.slice(startIndex, endIndex);
}


}
