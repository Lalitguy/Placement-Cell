import {
   Component,
   OnInit,
   ViewChild,
   ElementRef,
   Renderer2
} from '@angular/core';
import {
   DbService
} from 'src/app/shared/db.service';

import {
   Firestore,
   collection,
   addDoc,
   doc,
   setDoc,
   getDoc,
   getFirestore
} from '@angular/fire/firestore';
import {
   onAuthStateChanged
} from "firebase/auth";
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL
} from '@angular/fire/storage';
import firebase from 'firebase/compat/app';
import {
   ToastrService
} from 'ngx-toastr';

@Component({
   selector: 'app-dash-home',
   templateUrl: './dash-home.component.html',
   styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {

   ngOnInit(): void {
      this.fetchProfile();
   }
   //f : any = ''
   constructor(private db: DbService, private renderer: Renderer2, private toastr: ToastrService) {}



   valueData: any = 'string';
   addData(f: any) {

      this.db.openConfirmationDialog('Do you want to save the changes to your profile?').afterClosed().subscribe((result: boolean) => {
         if (result) {
            
            this.db.addData(f);

         }
      });
   }

   dataEmail: string = '';
   dataName: string = '';
   dataStudentId: string = '';
   dataGender: string = '';
   dataCourse: string = '';
   dataYear: string = '';
   dataDomain: string = '';
   dataPhone: string = '';
   dataAddress: string = '';
   dataImage: any = '';



   courses: string[] = ['B.Com', 'M.Com', 'B.Pharm', 'M.Pharm', 'Bsc CS', 'Bsc IT'];
   domains: string[] = ['Medical', 'Accounting ', 'Finance', 'AI/ML', 'IT Domain', 'Cyber', 'Forensics'];
   years: string[] = ['FY', 'SY', 'TY'];

   fetchProfile() {
      const db = getFirestore();
      firebase.auth().onAuthStateChanged(async (user) => {
         if (user) {
            const docRef = doc(db, "users", user.uid);
            try {
               const docSnap = await getDoc(docRef);
               if (docSnap.exists()) {
                  const docData = docSnap.data();

                  this.dataName = docData['name'];
                  this.dataEmail = docData['email'];
                  this.dataStudentId = docData['student_id'];
                  this.dataGender = docData['gender'];
                  this.dataCourse = docData['course'];
                  this.dataYear = docData['year'];
                  this.dataDomain = docData['domain'];
                  this.dataPhone = docData['phone'];
                  this.dataAddress = docData['address'];

                  const storageRef = ref(this.storage, 'user Profile/'+user.uid); // Replace with your image path
                  /*storageRef.getDownloadURL().subscribe(url => {
                     this.imageUrl = url;*/

                  getDownloadURL(storageRef).then((url)=> {
                     this.dataImage = url;

                  });

               } else {
                 
                  this.toastr.warning("Please Fill Your Profile Details")
               }
            } catch(error) {
               alert(error)
            }
         }
      })
   }



   selectedFile: File;

   onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
   }

   storage = getStorage();
   async uploadImage() {
      if (this.selectedFile) {

         firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
               const filePath = 'user Profile/' + user.uid;
               
               const storageRef = ref(this.storage, filePath);
               const uploadTask = await uploadBytesResumable(storageRef, this.selectedFile);
               this.toastr.success("Profile upload")
            }
         })
      }
   }



   @ViewChild('editForm',
      {
         static: true
      }) editDiv: ElementRef;
   @ViewChild('saveForm',
      {
         static: true
      }) saveDiv: ElementRef;


   editProfile() {
      this.renderer.setStyle(this.editDiv.nativeElement,
         'display',
         'none');
      this.renderer.setStyle(this.saveDiv.nativeElement,
         'display',
         'block');
   }
   saveProfile() {
      this.renderer.setStyle(this.saveDiv.nativeElement,
         'display',
         'none');
      this.renderer.setStyle(this.editDiv.nativeElement,
         'display',
         'block');

      this.fetchProfile();
   }
}