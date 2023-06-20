import { Component } from '@angular/core';
// import { MessageDataService } from '../message-data.service';
import { MessageService } from 'src/app/services/message.service';

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

   inbox: Message[] = [];
   sentItems: any[]=[];

  constructor(private mssg: MessageService) {}

  ngOnInit() {
    this.mssg.getSentItems();
    this.sentItems = this.mssg.getMssg();
  }
  


  // deleteMessage(index: number) {
  //   this.mssg.deleteMessage(index, 'sent');
  // }
  deleteMessage(index: number, folder: string) {
    this.mssg.deleteMessage(index, folder).subscribe(
      () => {
        if (folder === 'inbox') {
          this.inbox.splice(index, 1);
        } else if (folder === 'sent') {
          this.sentItems.splice(index, 1);
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
