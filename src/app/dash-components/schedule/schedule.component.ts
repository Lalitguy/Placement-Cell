import { Component, OnInit} from '@angular/core';
import {
   Firestore,
   collection,
   addDoc,
   doc,
   setDoc,
   getDoc,
   getDocs,
   getFirestore,
   where,
   orderBy,
   serverTimestamp,
   onSnapshot,
   query,
   DocumentData
} from '@angular/fire/firestore';
import {
   BehaviorSubject,
   Observable
} from 'rxjs';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { DbService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
   
   firestore = getFirestore();
   ngOnInit(){
      this.mySchedule$.subscribe((data) => {
      this.myScheduleFeed = data;
    });
   }
   
   private scheduleSubject = new BehaviorSubject < any[] > ([]);
   mySchedule$ = this.scheduleSubject.asObservable();
   
   constructor(private db: DbService){
      
      
      const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userID = user.uid;
       
      } else {
        // User is not logged in
        this.userID = null;
      }
    });
      
      //const recipientId:string = '6txv9JsGIUTZ5nLTCej1kSlA9Im2';
      const scheduleQuery = query(collection(this.firestore, 'studentSchedule'), orderBy('eventDateTime'));

      onSnapshot(scheduleQuery, (snapshot) => {
         
         const scheduleList: any = [];
         snapshot.forEach((doc) => {
            
            if(((doc.data())['userID']) == this.userID){
               //notifications.push(doc.data());
               
            scheduleList.push(doc.data());
            }
         });
         this.scheduleSubject.next(scheduleList);
         //alert(notifications['']);
      });
   }
   
   userID : any;
   myScheduleFeed: any[] = [];
   
   deleteEvent(id: string){
      this.db.openConfirmationDialog('Are you sure You want To Delete this Event from your Schedule ?').afterClosed().subscribe((result: boolean) => {
         if (result) {
            // Perform the action when the user confirms
            this.db.deleteEvent(id, "studentSchedule",false,this.userID);
         }
      });
   }
   
   openCalendar(datetimeValue: any, desc: string) {
      
      const googleCalendarUrl = this.db.generateGoogleCalendarLink(datetimeValue, desc);
      window.open(googleCalendarUrl, '_blank');
   }
   
   async openFile(fileID: string) {
      let FileUrl = await this.db.getFileUrl(fileID);
     

      if (FileUrl != null) {
         window.open(FileUrl, '_blank');

      }
   }
}
