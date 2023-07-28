import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  user_type:any;
  data: any;
  
  constructor(private http: HttpClient,private loginservice:LoginServiceService) { 

    const user=this.loginservice.getData();
    this.user_type=user[2];
    console.log(this.user_type);
    
  }
}
