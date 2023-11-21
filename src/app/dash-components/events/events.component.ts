import {
   Component,
   OnInit
} from '@angular/core';
import {
   DbService
} from 'src/app/shared/db.service';
import {
   getStorage,
   ref,
   getDownloadURL
} from '@angular/fire/storage';

@Component({
   selector: 'app-events',
   templateUrl: './events.component.html',
   styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

   constructor(private dbService: DbService) {}

   storage = getStorage();
   ngOnInit() {
      this.dbService.events$.subscribe((data) => {

         this.eventsFeed = data;

      });
   }
   eventsFeed: any[] = [];

   fileData: any[] = [];


   setToSchedule(id: string,
      heading: string,
      desc: string,
      type: string,
      dateTime: any) {

      this.dbService.addToMySchedule(id, heading, desc, type, dateTime);
   }

   async openFile(fileID: string) {
      let FileUrl = await this.dbService.getFileUrl(fileID);
      

      if (FileUrl != null) {
         window.open(FileUrl, '_blank');

      }
   }

   openCalendar(datetimeValue: any,
      desc: string) {

      const googleCalendarUrl = this.dbService.generateGoogleCalendarLink(datetimeValue,
         desc);
      window.open(googleCalendarUrl,
         '_blank');
   }
}