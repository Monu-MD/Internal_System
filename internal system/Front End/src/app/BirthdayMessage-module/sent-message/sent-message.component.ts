import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})
export class SentMessageComponent {

  messages: any[] = [];
  user_id: any;

  constructor(private http: HttpClient, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
  }

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.http.post('http://localhost:4000/message/sentmssg', { user_id: this.user_id })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.messages = response.messages;
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

}
