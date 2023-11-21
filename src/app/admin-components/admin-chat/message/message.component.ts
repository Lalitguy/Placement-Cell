import {
   Component,
   OnInit,
   Input
} from '@angular/core';
import {
   onAuthStateChanged
} from "firebase/auth";
import firebase from 'firebase/compat/app';

@Component({
   selector: 'app-message',
   templateUrl: './message.component.html',
   styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{

   @Input() chatMessage: any;

   messageContent: string;
   userEmail: string;
   timeStamp: Date = new Date();
   isOwnMessage: boolean;
   ownEmail: any;

   constructor() {
      firebase.auth().onAuthStateChanged(async (user) => {
         if (user) {
            this.ownEmail = await user.email;
            this.isOwnMessage = this.ownEmail === this.userEmail;

         }
      });
   }

   ngOnInit(chatMessage = this.chatMessage) {
      this.messageContent = chatMessage.message;
      this.timeStamp = chatMessage.timesent;
      this.userEmail = chatMessage.email;
   }

   
}