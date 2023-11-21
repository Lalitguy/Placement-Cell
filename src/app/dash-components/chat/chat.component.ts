import {
   Component,
   OnInit,
   ViewChild,
   ElementRef,
   AfterViewChecked
} from '@angular/core';
import {
   ChatService
} from '../../shared/chat.service';

@Component({
   selector: 'app-chat',
   templateUrl: './chat.component.html',
   styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

   constructor(private chatService: ChatService) {}

   ngOnInit() {
      this.chatService.messages$.subscribe((data) => {
         this.messages = data;
      });
   }

   messages: any[] = [];
   newMessage: string = '';

   send() {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
   }
   handleSubmit(event: any) {
      if (event.keyCode === 13) {
         //this.send();
      }
   }
   @ViewChild('scrollFeed', { static: true }) feedContainer: ElementRef;
  
  /*scrollToBottom(): void{
     this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }*/
   ngAfterViewChecked(){
      this.scrollToBottom();
   }
   scrollToBottom(): void {
    this.feedContainer.nativeElement.scroll({
      top: this.feedContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'auto'
    });
  }
}