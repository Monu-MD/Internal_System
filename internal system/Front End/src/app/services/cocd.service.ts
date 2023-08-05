import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CocdService {


  rowData: any;

  setRowData(value: any) {
    this.rowData = value;
  }

  getRowData() {
    return [this.rowData]
  }

  constructor(private http: HttpClient,
    private router: Router) { }


  postData(item: any) {
    const postData = {
      code_id: item.code_id,
      comm_code_id: item.comm_code_id,
      comm_code_desc: item.comm_code_desc,
      del_flg: 'N'
    };

    // post Data api 
    this.http.post('http://localhost:4000/cocd', postData)
      .subscribe(
        (response: any) => {


          console.log('Data posted successfully:', response);


        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  // Modify Data api 
  updateData(codeDetails: any) {
    this.http.put(`http://localhost:4000/cocd/${codeDetails.code_id}`, codeDetails).subscribe(
      (response: any) => {

        if (response.message == 'Data updated successfully') {
          console.log("Data updated Successfully");
        }
      },

      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }

  // delete Data api 
  deleteData(codeDetails: any) {
    this.http.delete(`http://localhost:4000/cocd/${codeDetails.code_id}`)
      .subscribe(
        (response: any) => {
          console.log('Data deleted successfully:', response);

        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  // Get Data api 

  dataLoaded: boolean = false;


  sendAns(){
     return this.rowData;
  }
  sendit(){
    return this.dataLoaded;
  }
}
