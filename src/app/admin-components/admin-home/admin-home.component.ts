import {
   Component,
   OnInit
} from '@angular/core';
import {
   DbService
} from 'src/app/shared/db.service';
import {
   onAuthStateChanged
} from "firebase/auth";
import firebase from 'firebase/compat/app';
import {
   doc,
   getDocs,
   getFirestore,
   collection,
   query,
   orderBy
} from '@angular/fire/firestore';


@Component({
   selector: 'app-admin-home',
   templateUrl: './admin-home.component.html',
   styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

   constructor() {}
   ngOnInit(): void {}
   
   docInfo:any= [];
   db = getFirestore();
   
   selectedSortOption: string;
   //selectedSortOption: string= 'userID';
   async getAllDoc(sort: string) {
      
      const colRef = collection(this.db, "users");
      
      //const scheduleQuery = query(colRef, orderBy(this.selectedSortOption));
      let sortCriteria: string = sort;
      if(this.selectedSortOption){
         /*if(this.selectedSortOption == 'Year-of-Study'){
            sortCriteria = 'year'
         }
         if(this.selectedSortOption == 'Course'){
            sortCriteria = 'course'
         }*/
         sortCriteria = this.selectedSortOption; 
         
      }
      let docQuery = query(colRef, orderBy(sortCriteria));
      this.selectedSortOption = '';
      try {
         const docsSnap = await getDocs(docQuery);
         this.docInfo = [];
         //this.docInfo = docsSnap ;
         docsSnap.forEach(doc => {
            console.log(doc.data());
            //alert((doc.data()));
            //this.docInfo = (doc.data());
            this.docInfo.push(doc.data());
         });
         
         
      } catch (error) {
         console.log(error);
      }
   }
   
   


   
}
/*export interface docInstance{
      name?: string;
      email?: string;
      student_id?: string;
      gender?: string;
      course?: string ;
      year?: string;
      phone?: number ;
      address?: number;
   };*/