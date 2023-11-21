import { Component, OnInit} from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
  

  ngOnInit(){
    this.notificationService.notifications$.subscribe((data) => {
      this.notificationFeed = data;
    });
  }
  constructor(private notificationService: NotificationService) {}
  
  notificationFeed: any[]= [];
  
  
}
