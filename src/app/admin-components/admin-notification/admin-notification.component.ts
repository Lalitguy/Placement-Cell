import { Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { DbService } from 'src/app/shared/db.service';
import { ClipboardService } from 'ngx-clipboard';
import {
  ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent {
   notificationText: string = '';
  recipientId: string = ''; // Input field for recipient ID

  constructor(
     private notificationService: NotificationService, 
     private db: DbService,
     private clipboardService: ClipboardService,
     private toastr: ToastrService) {}

  // Function to send a notification
  async sendNotification() {
    const notification = {
      text: this.notificationText,
      timestamp: new Date(),
      recipientId: this.recipientId, // Include recipient ID
    };

    try {
      await this.notificationService.addNotification(notification);
      this.toastr.success("Notification Sent Successfully")
      // Clear the input fields
      this.notificationText = '';
      this.recipientId = '';
    } catch (error) {
      this.toastr.error('Error sending notification:' + error);
    }
  }
  
  
  courses: string[] = ['B.Com','M.Com' , 'B.Pharm','M.Pharm', 'Bsc CS','Bsc IT'];
  domains : string[] = ['Medical', 'Accounting ', 'Finance', 'AI/ML', 'IT Domain', 'Cyber', 'Forensics'];
  years: string[] = ['FY', 'SY', 'TY'];

  selectedCourse: string;
  selectedDomain: string;
  selectedYear: string;
  showTable: boolean = false;
  
  documents: any = [];

  async retrieveData() {
    if (this.selectedCourse || this.selectedDomain || this.selectedYear) {
      this.documents = await this.db.getDocumentsByFilters(
        this.selectedCourse,
        this.selectedDomain,
        this.selectedYear
        
      
      );
      this.showTable = true;
    } else {
     
    }
  }
  
  copyToClipboard(content: string) {
    this.clipboardService.copyFromContent(content);
    this.toastr.info('ID Copied to clipboard','', {
      timeOut: 1500,
    });
  }
 
}
