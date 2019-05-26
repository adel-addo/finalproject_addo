import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators'
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore ,AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import { User } from '../models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {
  userData:Observable<any>;
//userrole:any;
userrole:string;
isadmin:boolean;
  constructor(private router: Router, public firestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,public alertCtrl: AlertController) {}



  islogin() : boolean{

 
    this.angularFireAuth.auth.onAuthStateChanged(user => {
  if (user) {
    this.userData=this.firestore.collection('users').doc(user.email).valueChanges();
  
    this.userData.subscribe(users => { 
    
     //  this.userrole=users.roles;
     //this.presentAlert( "calling getroles");
     this.isadmin=this.getRoles( users.roles);
     
    
    });

    //this.presentAlert( this.userrole);


  } else {
 
   // this.presentAlert("User does not exist");
    this.isadmin=false;
   
  }
});
    
 // this.presentAlert( "reached end of islogin");
  return this.isadmin  ;
  
    }

  async presentAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Access Denied!',
      message: error,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.router.navigate(['/withtabs']);
          }
        },
        {
          text: 'Back to login',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]

    });

     alert.present();
  }



  getRoles(roles):boolean
  {
    this.userrole=roles;
    if(this.userrole=="admin")
      { //this.presentAlert( "get roles returned true");
      this.isadmin=true;}
    else
      {  //this.presentAlert( "get roles returned false");
       // this.presentAlert( this.userrole);
       this.isadmin=false;  
      }
     return this.isadmin;
  }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const loggedIn = this.islogin();//replace with actual user auth checking logic

    if (!loggedIn) {
      if(!this.isadmin)
      { this.presentAlert( "Only admins are allowed on this page.");
    // this.presentAlert("You don't have access to this page")
      }
    }

    return loggedIn;
  }
  
}
