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
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent {

  recipient: string = '';
  content: string = '';

  constructor(private mssg: MessageService) { }

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
    
    // this.messageDataService.sendMessage(message);
    this.mssg.sendMessage(message);
    this.clearForm();
  }

  private clearForm() {
    this.recipient = '';
    this.content = '';
  }
}

