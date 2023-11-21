import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit{
   
   ngOnInit(): void {}
   
   constructor(private auth : AuthService) { }
   
   logout(){
      this.auth.logout();
   }
   sideBarOpen = true;

   sideBarToggler() {
     this.sideBarOpen = !this.sideBarOpen;
  }

}
