import {
   Injectable
} from '@angular/core';
import {
   getFirestore,
   collection,
   addDoc,
   orderBy,
   onSnapshot,
   query,
   where,
   getDocs,
   DocumentData
} from 'firebase/firestore';
import {
   BehaviorSubject,
   Observable
} from 'rxjs';
import {
   getAuth,
   onAuthStateChanged
} from 'firebase/auth';

@Injectable({
   providedIn: 'root'
})
export class NotificationService {

   firestore = getFirestore();
   notificationsCollectionRef = collection(this.firestore, 'notifications');

   private notificationsSubject = new BehaviorSubject < any[] > ([]);
   notifications$ = this.notificationsSubject.asObservable();

   constructor() {

     
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
         if (user) {
            this.userID = user.uid;

         } else {
            // User is not logged in
            this.userID = null;
         }
      });

 
      const messagesQuery = query(collection(this.firestore, 'notifications'),
         orderBy('timestamp'));

      onSnapshot(messagesQuery,
         (snapshot) => {
            const notifications: any = [];
            snapshot.forEach((doc) => {
               if (((doc.data())['recipientId']) == this.userID) {
                  notifications.push(doc.data());
               }
             
            });
            this.notificationsSubject.next(notifications);
            
         });

   }

   // Add a notification to Firestore
   async addNotification(notification: any) {

      try {
         await addDoc(this.notificationsCollectionRef, notification);
      } catch (error) {
         throw new Error('Error adding notification: ' + error);
      }
   }
   userID: any;
   // Get notifications for a specific recipient ID
   /*getNotificationsForRecipient() {
    return this.notifications;
  }*/

}