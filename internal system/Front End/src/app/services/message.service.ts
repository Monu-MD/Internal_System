import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Message {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private inbox: any[] = [];

  constructor(private http: HttpClient,
    private router: Router) { }

  // post message
  sendMessage(mssg: any) {
    const message = {
      to_user_id: mssg.recipient,
      message_content: mssg.content,
    };

    // post message api 
    this.http.post('http://localhost:4000/message/sendWishes', message)
      .subscribe(
        (response: any) => {
          console.log('Message sent successfully:', response);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
  
   //get message
  private sentItems: any[] = [];

  getSentItems(){
    this.http.get('http://localhost:4000/message')
      .subscribe(
        (response: any) => {
          if (response && response.data ) {
            this.sentItems = response.data;
            // console.log(response.data);
            
          } else {
            console.error('Invalid response data');
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  getMssg(){
    console.log(this.sentItems);
     return this.sentItems;
  }
  

//delete  message api
  // deleteMessage(index: number, folder: string): void {
  //   if (folder === 'inbox') {
  //     this.inbox.splice(index, 1);
  //   } else if (folder === 'sent') {
  //     this.sentItems.splice(index, 1);
  //   }
  // }

  deleteMessage(index: number, folder: string) {
    const apiUrl = `http://localhost:4000/message/${folder}/${index}`;
    return this.http.delete(apiUrl);
  }
}
