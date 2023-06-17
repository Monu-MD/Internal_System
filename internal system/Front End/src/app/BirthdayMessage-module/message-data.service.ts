import { Injectable } from '@angular/core';

interface Message {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})

export class MessageDataService {
  
  private inbox: Message[] = [];
  private sentItems: Message[] = [];

  constructor() { }

  getInbox(): Message[] {
    return this.inbox;
  }

  getSentItems(): Message[] {
    return this.sentItems;
  }

  sendMessage(message: Message): void {
    this.sentItems.push(message);
  }

  deleteMessage(index: number, folder: string): void {
    if (folder === 'inbox') {
      this.inbox.splice(index, 1);
    } else if (folder === 'sent') {
      this.sentItems.splice(index, 1);
    }
  }

}
