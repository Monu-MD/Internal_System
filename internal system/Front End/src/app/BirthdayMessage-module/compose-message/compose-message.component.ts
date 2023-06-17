import { Component } from '@angular/core';

import { MessageDataService } from '../message-data.service';


interface Message {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}


@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent {


  // inbox: Message[];
  // sentItems: Message[];
  // recipient= '';
  // content='';

  // constructor() {
  //   this.inbox = [];
  //   this.sentItems = [];
  // }

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

  recipient: string = '';
  content: string = '';

  constructor(private messageDataService: MessageDataService) { }

  composeMessage() {
    const message: Message = {
      sender: 'Your Name',
      recipient: this.recipient,
      content: this.content,
      timestamp: new Date()
    };

        // Display the success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
          successMessage.style.display = 'block';
        }
    
    this.messageDataService.sendMessage(message);
    this.clearForm();
  }

  private clearForm() {
    this.recipient = '';
    this.content = '';
  }
}

