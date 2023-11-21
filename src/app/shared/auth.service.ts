import {
   Injectable
} from '@angular/core';
import {
   AngularFireAuth
} from '@angular/fire/compat/auth';
import {
   Router
} from '@angular/router';
import {
   DbService
} from 'src/app/shared/db.service';
import {
   BehaviorSubject
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(private fireauth: AngularFireAuth, private router: Router , private toastr: ToastrService, private db: DbService) {}

   //boolean to keep track of log-in
   isLoggedIn = new BehaviorSubject < boolean > (false);
   
   //boolean keep track of admin log-in
   isAdminLoggedIn = new BehaviorSubject < boolean > (false);

   //login method
   login(email: string, password: string) {

      if (email == 'admin@tnpadmin.com' && password == 'tnpadmin123') {
         
         /*this.isAdminLoggedIn.next(true);
         localStorage.setItem('admin-token', 'true');
         
         this.router.navigate(['dashboardadmin']);
         */
         this.fireauth.signInWithEmailAndPassword(email, password).then(res => {

            this.isAdminLoggedIn.next(true);
            localStorage.setItem('admin-token', 'true');

            this.router.navigate(['dashboardadmin']);
            this.toastr.success('Logged in Successfully');
         }, err => {
            this.toastr.error(err.message);
            this.router.navigate(['/login']);
         })
         return;
      } else {
         this.fireauth.signInWithEmailAndPassword(email, password).then(res => {

            this.isLoggedIn.next(true);
            localStorage.setItem('token', 'true');

            this.router.navigate(['dashboard']);
            this.toastr.success('Logged in Successfully');
         }, err => {
            this.toastr.error(err.message);
            this.router.navigate(['/login']);
         })
      }
   }

   // register method
   register(email: string, password: string) {
      this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
         this.toastr.success('Registration Successful');
         this.router.navigate(['/login']);
      }, err => {
         this.toastr.error(err.message);
         this.router.navigate(['/register']);
      })
   }

   // sign out
   logout() {
      
      
      this.db.openConfirmationDialog('You will be Logged Out').afterClosed().subscribe((result: boolean) => {
         if (result) {
            
         
      this.fireauth.signOut().then(() => {
         localStorage.removeItem('token');
         localStorage.removeItem('admin-token');
         this.router.navigate(['/login']);
         this.toastr.success('Logged Out Successfully');
      }, err => {

         this.toastr.error(err.message);
      })
         }
      });
   }


   //saving login instance when reloading page
   reloadPage() {
      if (localStorage.getItem('token')) {
         this.isLoggedIn.next(true);
         this.router.navigate(['dashboard']);
      }
      if (localStorage.getItem('admin-token')) {
         this.isAdminLoggedIn.next(true);
         this.router.navigate(['dashboardadmin']);
      }
   }


}