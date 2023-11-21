import {
   Component
} from '@angular/core';
import {
   DbService
} from 'src/app/shared/db.service';
import {
   serverTimestamp
} from '@angular/fire/firestore';
import {
   getStorage,
   ref,
   uploadBytesResumable
} from '@angular/fire/storage';
import {
   Router
} from '@angular/router';
import {
   ToastrService
} from 'ngx-toastr';

@Component({
   selector: 'app-company-application',
   templateUrl: './company-application.component.html',
   styleUrls: ['./company-application.component.scss']
})
export class CompanyApplicationComponent {

   constructor(private db: DbService, private toastr: ToastrService, private router: Router) {}

   addCompanyDetails(f: any) {
      f.value.timestamp = serverTimestamp();

      //storing file in storage with name comapnyName+jobTitle -- to make it as unique as possible
      this.fileName = f.value['companyName'] + f.value['jobTitle'];

      //comfirmation
      this.db.openConfirmationDialog('Submit Application ?').afterClosed().subscribe((result: boolean) => {
         if (result) {
            
            //adding application data and uploading file 
            this.db.addCompanyDetails(f);
            this.uploadFile();
         }
      });
   }
   fileName: string;
   selectedFile: File;
   onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
   }
   storage = getStorage();
   async uploadFile() {
      if (this.selectedFile) {
         const filePath = 'companyApplications/' + this.fileName;
         //alert(filePath);
         const storageRef = ref(this.storage, filePath);
         const uploadTask = await uploadBytesResumable(storageRef, this.selectedFile);
         //this.toastr.success('application submitted');
         this.router.navigate(['/home']);
      }
   }
}