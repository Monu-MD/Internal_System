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


  constructor(private router:Router) {
    
  }

  onWish(){
  this.router.navigateByUrl('/composeMessage');
  }

}
