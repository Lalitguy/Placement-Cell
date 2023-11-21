import {
   Injectable
} from '@angular/core';
import {
   getFirestore,
   collection,
   onSnapshot,
   addDoc,
   query,
   limitToLast,
   orderBy,
   refEqual,
   limit,
   serverTimestamp
} from '@angular/fire/firestore';
import {
   getAuth,
   onAuthStateChanged
} from 'firebase/auth';

import {
   BehaviorSubject,
   Observable
} from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class ChatService {


   chatMessages: any = [];
   
   userName: Observable < string >;

   private firestore = getFirestore();
   private messagesSubject = new BehaviorSubject < any[] > ([]);
   messages$ = this.messagesSubject.asObservable();

   constructor() {
      const messagesQuery = query(collection(this.firestore, 'messages'), orderBy('timestamp'));

      onSnapshot(messagesQuery, (snapshot) => {
         const messages: any = [];
         snapshot.forEach((doc) => {
            messages.push(doc.data());
         });
         this.messagesSubject.next(messages);
      });
   }

   async sendMessage(newMessage: string) {
      if (newMessage.trim() !== '') {
         const auth = getAuth(); 
         const user = auth.currentUser; 
         if (user) {
            const email = user.email; // Get the user's UID
            await addDoc(collection(this.firestore, 'messages'), {
               message: newMessage,
               timestamp: serverTimestamp(),
               email: email
            });
            
         }
      }
   }

}