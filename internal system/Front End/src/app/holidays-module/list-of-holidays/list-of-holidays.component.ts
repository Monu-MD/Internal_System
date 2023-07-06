import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-list-of-holidays',
  templateUrl: './list-of-holidays.component.html',
  styleUrls: ['./list-of-holidays.component.css']
})
export class ListOfHolidaysComponent {
user_type:any;
  data: any;
  
  constructor(private http: HttpClient,private loginservice:LoginServiceService) { 

    const user=this.loginservice.getData();
    this.user_type=user[2];
    console.log(this.user_type);
    

  }

  viewHolidaysForm:any;
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
  this.http.get('http://localhost:4000/holiday/viewHolidays')
    .subscribe(
      (response: any) => {
        console.log(response.data);
        
        if (response.message=='redirect to viewHolidays') {
          this.rowData = response.data;
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

deleteHoliday(row: any) {
  this.http.get(`http://localhost:4000/holiday/removeHolidays/${row.hol_id}`).subscribe(
    (response: any) => {
              console.log('Data deleted successfully:', response);
               // Remove the deleted item from rowData array it will reloaded 
              this.rowData = this.rowData.filter(item => item.hol_id !== row.hol_id);
            },
            (error: any) => {
              console.error('Error:', error);
            }  
  );
 
  }


  onSubmit(item:any){
    console.log(item);
     this.deleteHoliday(item);
  }

  get(){
    return this.onSubmit
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
    this.rowData = this.rowData.slice(startIndex, endIndex);
  
  }
}
