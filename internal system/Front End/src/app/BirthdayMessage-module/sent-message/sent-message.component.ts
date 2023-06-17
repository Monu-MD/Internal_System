import { Component } from '@angular/core';
import { MessageDataService } from '../message-data.service';

interface Message {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})
export class SentMessageComponent {

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
  sentItems: Message[];

  constructor(private messageDataService: MessageDataService) {
    this.sentItems = this.messageDataService.getSentItems();
  }

  deleteMessage(index: number) {
    this.messageDataService.deleteMessage(index, 'sent');
  }
}
