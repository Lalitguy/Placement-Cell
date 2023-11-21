import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/db.service';
import {
   getStorage,
   ref,
   uploadBytesResumable
} from '@angular/fire/storage';
import {
   serverTimestamp
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-admin-event',
   templateUrl: './admin-event.component.html',
   styleUrls: ['./admin-event.component.scss']
})
export class AdminEventComponent implements OnInit {

   ngOnInit() {
      this.db.events$.subscribe((data) => {

         this.eventsFeed = data;
      });

   }
   constructor(private db: DbService, private toastr: ToastrService) {

   }

   //adding Event
   addEvent(f: any) {
      f.value.timestamp = serverTimestamp();

      this.fileID = f.value['eventID'];
      this.db.addEvent(f);
      this.uploadFile();
   }
   //adding Event file
   selectedFile: File;

   onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
   }

   fileID: string;
   eventsFeed: any[] = [];

   storage = getStorage();
   async uploadFile() {
      if (this.selectedFile) {
         const filePath = 'eventDoc/' + this.fileID;
         
         const storageRef = ref(this.storage, filePath);
         const uploadTask = await uploadBytesResumable(storageRef, this.selectedFile);
        
         this.toastr.success("Event Document Uploaded");
      }
   }

   //Delete Event
   deleteEvent(id: string) {
      this.db.openConfirmationDialog('Are you sure You want To Delete this Event?').afterClosed().subscribe((result: boolean) => {
         if (result) {
            
            this.db.deleteEvent(id, "events");
         }
      });

   }

   async openFile(fileID: string) {
      let FileUrl = await this.db.getFileUrl(fileID);

      if (FileUrl != null) {
         window.open(FileUrl, '_blank');
         return
      }

      

   }
}