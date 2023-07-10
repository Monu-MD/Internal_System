import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

// import { MessageDataService } from '../message-data.service';
// import { MessageService } from 'src/app/services/message.service';


// interface Message {
//   sender: string;
//   recipient: string;
//   content: string;
//   timestamp: Date;
// }


@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent {


  recipient: string = '';
  content: string = '';
  user_id: any;

  constructor(private http: HttpClient, private loginservice: LoginServiceService, private router: Router) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
  }

  composeMessage() {
    const message = {
      user_id: this.user_id,
      recipient: this.recipient,
      content: this.content
    };
      
    this.http.post('http://localhost:4000/message/sendWishes', message)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == "redirect to admindashboard") {
            this.router.navigateByUrl("/dashboard");
          }
          else {

          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  

}

