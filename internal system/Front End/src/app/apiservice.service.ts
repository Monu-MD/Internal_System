import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  apiurl="http://localhost:3000/customer/99";
  createUrl="http://localhost:3000/insert";

  getuser():Observable<any>{
    return this.http.get(`${this.apiurl}`)
  }

  // insert data
  createData(data:any):Observable<any>{
    console.log(data,'created');
    console.log(typeof(data));
    // data.employeeId;
    return this.http.post(`${this.createUrl}`,data.employeeId)
    // return this.http.post<any>(this.createUrl, data.employeeId);
  }
}
