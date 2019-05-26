import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from "@ionic/angular";
import { AngularFirestore ,AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
ids:string
roles:string
//abampoe_addo@st.ud.edu.gh
async presentErrorAlert(error,sub) {
  const alert = await this.alertCtrl.create({
    header: 'Alert',
    subHeader: sub,
    message: error,
    buttons: [
      {
        text: 'Back to login',
       // role: 'ok',
        handler: () => {
          this.router.navigate(['/login']);
        }
      },
      {
        text: 'Ok',
        role:"ok"
      }
    ]

  });

   alert.present();
}
  async presentAlert(error,sub) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: sub,
      message: error,
      buttons: [
        {
          text: 'Back to login',
         // role: 'ok',
          handler: () => {
            this.router.navigate(['/login']);
          }
        },
        
        {
          text: 'ok',
          role: 'ok',
        }
      ]

    });

     alert.present();
  }
  
constructor(private router: Router,public alertCtrl: AlertController,
  private storage: AngularFireStorage, private db: AngularFirestore,
  public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }


  createUser(username,email,roles)
  {
      this.ids = email;
           
   this.db.doc(`users/${this.ids}`).set( { username:username,email:email,roles:roles})

  }

  
sendPassword(email) {
  this.angularFireAuth.auth.sendPasswordResetEmail(email)
  .then(() => {
    this.presentAlert("Please check your email to reset password.","Password sent");
  }) .catch((err)=> {
    //Do as you please here
    
    this.presentErrorAlert(err.message,"Password Reset Error");
  });
}


sendEmailVerification() {
  this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification()
      .then(() => {
        this.presentAlert("Please check your email and verify your account.","Verify your email");
      }) .catch((err)=> {
        //Do as you please here
        
        this.presentErrorAlert(err.message,"Email verification Error");
      });
    });
}
  
register(username,email,password) {
  this.roles="student"
  this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  .then((res) => {
    this.sendEmailVerification();
    this.presentAlert("Verify email to complete registration.","Almost done");
    this.createUser(username,email,this.roles);

  })
  .catch((err)=> {
    //Do as you please here
    
    this.presentErrorAlert(err.message,"Registration Error");
  });
}

}
