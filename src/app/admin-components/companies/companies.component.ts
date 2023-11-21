import {
   Component,
   OnInit
} from '@angular/core';
import {
   DbService
} from 'src/app/shared/db.service';
import {
   BehaviorSubject,
   Observable
} from 'rxjs';
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

@Component({
   selector: 'app-companies',
   templateUrl: './companies.component.html',
   styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

   ngOnInit() {
      this.companyApplication$.subscribe((data) => {
         this.companyFeed = data;
      });
   }
   firestore = getFirestore();
   constructor(private db: DbService) {

      const companyQuery = query(collection(this.firestore, 'CompanyApplications'), orderBy('timestamp'));

      onSnapshot(companyQuery, (snapshot) => {

         let companyList: any = [];
         snapshot.forEach((doc) => {
            //const showDetails : boolean = false;
            (doc.data())['showDetails'] = false;
            companyList.push(doc.data());
            //companyList.showDetails = showDetails;
         });
         this.companySubject.next(companyList);
         //alert(notifications['']);
      });
   }



   private companySubject = new BehaviorSubject < any[] > ([]);
   companyApplication$ = this.companySubject.asObservable();

   companyFeed: any[] = [];

   deleteEvent(name: string) {

      this.db.openConfirmationDialog('Are you sure You want To Delete this Company Application?').afterClosed().subscribe((result: boolean) => {
         if (result) {
            // Perform the action when the user confirms
            this.db.deleteEvent(name, "CompanyApplications", true);
         }
      });

   }

   openCalendar(datetimeValue: any,
      desc: string) {

      const googleCalendarUrl = this.db.generateGoogleCalendarLink(datetimeValue,
         desc);
      window.open(googleCalendarUrl,
         '_blank');
   }

   async openFile(fileID: string) {
      let FileUrl = await this.db.getFileUrl(fileID,
         'companyApplications/');
      

      if (FileUrl != null) {
         window.open(FileUrl, '_blank');

      }
   }
   toggleInfo(company: any) {
    company.showDetails = !company.showDetails;
  }
}