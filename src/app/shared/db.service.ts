import {
   Injectable
} from '@angular/core';
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
   DocumentData,
   deleteDoc
} from '@angular/fire/firestore';
import {
   onAuthStateChanged
} from "firebase/auth";
import firebase from 'firebase/compat/app';
import {
   BehaviorSubject,
   Observable
} from 'rxjs';
import {
   ToastrService
} from 'ngx-toastr';
import {
   getStorage,
   ref,
   getDownloadURL
} from '@angular/fire/storage';
import {
   MatDialog, MatDialogConfig
} from '@angular/material/dialog';
import {
   ConfirmationDialogComponent
} from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
   providedIn: 'root'
})
export class DbService {

   //Observale for storing events information
   private eventsSubject = new BehaviorSubject < any[] > ([]);
   events$ = this.eventsSubject.asObservable();

   //code in constructor is for dynamically rendering events
   constructor(private firestore: Firestore, private toastr: ToastrService, private dialog: MatDialog) {

      (async () => {
         const eventsQuery = query(collection(this.firestore, 'events'), orderBy('timestamp'));


         const initialSnapshot = await new Promise < any[] > ((resolve) => {
            onSnapshot(eventsQuery, (snapshot) => {
               const eventList: any = [];

               snapshot.forEach((doc) => {

                  eventList.push(doc.data());

               });
               resolve(eventList);
               this.eventsSubject.next(eventList);
            });
         });

      })();
   }


   db = getFirestore();
   storage = getStorage();
   //code for adding profile data to db
   addData(f: any) {

      firebase.auth().onAuthStateChanged((user)=> {
         if (user) {

            f.value.userID = user.uid;
            const docRef = doc(this.db, "users", user.uid);

            setDoc(docRef, f.value)
            .then(() => {
               
               this.toastr.success('Profile updated successfully')
            })
            .catch(error => {
               console.log(error);
            })
         }
      });
   }


   //code for adding Event to db
   async addEvent(event: any) {
      const docRef = collection(this.db,
         'events');
      const exists = await this.checkEventID(event.value.eventID);
      if (exists == 'true') {
         
         this.toastr.warning('Event with this id already exists');
         return;
      } else {
         try {
            await addDoc(docRef,
               event.value);
            
            this.toastr.success('Event Created Successfully');
         } catch (error) {
            throw new Error('Error adding Event: ' + error);
         }
      }
   }
   async checkEventID(id: string) {
      const checkQuery = query(collection(this.db, 'events'), where("eventID", "==", id));
      const checkDocs = await getDocs(checkQuery);
      if (!checkDocs.empty) {
         return 'true';
      }
      return 'false';
   }

   //using same function for deleting Event from mySchedyle and adminEvents
   async deleteEvent(id: string, collectionName: string,
      company?: boolean,
      userID?: string) {

      let q: any;
      if (userID) {

         q = query(collection(this.db, collectionName), where('eventID', '==', id), where('userID', '==', userID));
      } else if (company) {
         q = query(collection(this.db, collectionName), where('companyName', '==', id));
      } else {
         q = query(collection(this.db, collectionName), where('eventID', '==', id));
      }

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
         // Assume you want to delete the first document found
         const documentToDelete = querySnapshot.docs[0];

         // Get the reference to the document and delete it
         await deleteDoc(doc(this.db, collectionName, documentToDelete.id));
         
         this.toastr.success("Deleted Successfully")
      } else {
         
         this.toastr.warning("No matching documents found.")
      }



   }

   //adding to student's shedule
   async addToMySchedule(id: string,
      heading: string,
      desc: string,
      type: string,
      dateTime: any) {

      firebase.auth().onAuthStateChanged(async(user)=> {
         if (user) {

            const exists = await this.checkMySchedule(user.uid, id)

            if (exists == 'true') {
             
               this.toastr.warning("Event Already Added To Myschedule");
               
               return;
            }
            const docRef = collection(this.db, 'studentSchedule');

            const scheduleData = {
               eventType: type,
               eventHeading: heading,
               eventDescription: desc,
               eventDateTime: dateTime,
               eventID: id,
               userID: user.uid
            }
            try {
               await addDoc(docRef, scheduleData);
               
               this.toastr.success('Event added to MySchedule')
            } catch (error) {
               throw new Error('Error adding Event: ' + error);
               
            }
         }
      });
   }


   //code to check whether event is already added in MySchedule

   async checkMySchedule(userID: string,
      id: string) {

      const checkQuery = query(collection(this.db, 'studentSchedule'),
         where("eventID", "==", id),
         where("userID", "==", userID));
      const checkDocs = await getDocs(checkQuery);

      if (!checkDocs.empty) {
         return 'true';
      }
      return 'false';
   }

   //code for sorting documents
   async getDocumentsByFilters(course?: string,
      domain?: string,
      year?: string) {
      const colRef = collection(this.db,
         "users");
      let q = query(colRef);

      if (course) {
         q = query(q, where('course', '==', course));
      }

      if (domain) {
         q = query(q, where('domain', '==', domain));
      }

      if (year) {
         q = query(q, where('year', '==', year));
      }
      try {
         const docsSnap = await getDocs(q);
         let Filterdocs: any[] = [];
         
         docsSnap.forEach(doc => {
            console.log(doc.data());
            
            Filterdocs.push(doc.data());
         })
         return Filterdocs;
      } catch (error) {
         console.log(error);
      }
      return
   }

   //adding company Details
   async addCompanyDetails(f: any) {
      const docRef = collection(this.db,
         'CompanyApplications');

      try {
         await addDoc(docRef, f.value);
         
         this.toastr.success('Application Sent Successfully');
      } catch (error) {
         throw new Error('Error adding Event: ' + error);
      }
   }

   //google calendar link
   generateGoogleCalendarLink(dateTime: string, eventDescription: string) {
      const getISTDateTime = new Date(dateTime).toLocaleString(undefined, {
         timeZone: 'Asia/Kolkata'
      });
      const getISODateFormat = new Date (getISTDateTime).toISOString();

      let formattedDateTime = getISODateFormat.replace(/[:\-\.]/g, '');

      const encodedEventDescription = encodeURIComponent(eventDescription);


      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&dates=${formattedDateTime}/${formattedDateTime}&text=Event&details=${encodedEventDescription}&sf=true&output=xml`;

      return googleCalendarUrl;
   }

   async getFileUrl(fileID: string, pathRef?: string) {

      let path: string = 'eventDoc/'
      if (pathRef) {
         path = pathRef;
      }
      const storageRef = ref(this.storage, path + fileID);

      
      try {
         const url = await getDownloadURL(storageRef);
         
         return url;
       } catch (error) {
         
         this.toastr.warning('File not found or storage path does not exist.');
         
         return null;
       }
      return null
   }



   //confirmation Dialogue
   
   openConfirmationDialog(message: string): any {
      
      const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px';
    //dialogConfig.data = 'Are you sure?';
    panelClass: 'custom-dialog-container';

    // Specify the position here
    dialogConfig.position = {
      bottom: '50%'
    };
      return this.dialog.open(ConfirmationDialogComponent, {
         width: '250px',
         data: { message },
         //panelClass: 'custom-dialog-container' // Add a custom CSS clas
      });
      //return this.dialog.open( ConfirmationDialogComponent, dialogConfig)
   }
}