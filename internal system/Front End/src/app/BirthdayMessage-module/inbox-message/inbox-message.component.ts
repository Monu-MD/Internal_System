import { Component } from '@angular/core';
import { MessageDataService } from '../message-data.service';

interface Message {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-inbox-message',
  templateUrl: './inbox-message.component.html',
  styleUrls: ['./inbox-message.component.css']
})
export class InboxMessageComponent {

  inbox: Message[];

  constructor(private messageDataService: MessageDataService) {
    this.inbox = this.messageDataService.getInbox();
  }

  deleteMessage(index: number) {
    this.messageDataService.deleteMessage(index, 'inbox');
  }
}
