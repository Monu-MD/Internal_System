import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Message {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  inbox: Message[];
  sentItems: Message[];
  recipient= '';
  content='';

  constructor(private router:Router) {
    this.inbox = [];
    this.sentItems = [];
  }

  onWish(){
  this.router.navigateByUrl('/composeMessage');
  }


  // composeMessage() {
    
  //   const message: Message = {
  //     sender: 'Your Name',
  //     recipient: this.recipient,
  //     content: this.content,
  //     timestamp: new Date()
  //   };

  //   this.sentItems.push(message);
  //   this.clearForm();
  // }

  // deleteMessage(index: number, folder: string) {
  //   if (folder === 'inbox') {
  //     this.inbox.splice(index, 1);
  //   } else if (folder === 'sent') {
  //     this.sentItems.splice(index, 1);
  //   }
  // }

  // private clearForm() {
  //   this.recipient = '';
  //   this.content = '';
  // }
}
